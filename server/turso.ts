import { createClient, Client } from '@libsql/client';
import dotenv from 'dotenv';
import { INITIAL_FACULTIES, INITIAL_POINT_RECORDS, MOCK_STAFF_USERS, MOCK_STUDENTS_LIST } from '../src/data/mockData.js';

dotenv.config();

const TURSO_URL = process.env.TURSO_DATABASE_URL || 'libsql://facultyscore-coach.aws-ap-northeast-1.turso.io';
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN || '';

export interface TursoDbStatus {
  connected: boolean;
  url: string;
  hasToken: boolean;
  mode: 'turso_cloud' | 'local_fallback';
  message: string;
  tableCounts: {
    faculties: number;
    point_records: number;
    students: number;
    staff: number;
  };
}

class TursoDatabaseService {
  private client: Client | null = null;
  private isConnected: boolean = false;
  private connectionError: string | null = null;
  
  // Local cache fallback when Turso is offline or 401 token missing
  private localFaculties = [...INITIAL_FACULTIES];
  private localRecords = [...INITIAL_POINT_RECORDS];
  private localStudents = [...MOCK_STUDENTS_LIST];
  private localStaff = [...MOCK_STAFF_USERS];

  constructor() {
    this.initClient();
  }

  private initClient() {
    try {
      this.client = createClient({
        url: TURSO_URL,
        authToken: TURSO_TOKEN,
      });
    } catch (err: any) {
      console.warn('[Turso] Init client error:', err.message);
      this.client = null;
    }
  }

  public async initializeDatabase(): Promise<boolean> {
    if (!this.client) return false;

    try {
      // Test basic connection
      await this.client.execute('SELECT 1');
      this.isConnected = true;
      this.connectionError = null;
      console.log('✅ [Turso] Successfully connected to Turso Cloud DB:', TURSO_URL);

      // Create tables if not exists
      await this.client.batch([
        `CREATE TABLE IF NOT EXISTS faculties (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          uz_name TEXT NOT NULL,
          symbol TEXT,
          motto TEXT,
          total_points INTEGER DEFAULT 0,
          weekly_change INTEGER DEFAULT 0,
          monthly_change INTEGER DEFAULT 0,
          rank INTEGER DEFAULT 1,
          classes_count INTEGER DEFAULT 0,
          students_count INTEGER DEFAULT 0,
          breakdown_json TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS point_records (
          id TEXT PRIMARY KEY,
          transaction_code TEXT,
          title TEXT NOT NULL,
          reason TEXT,
          faculty_id TEXT NOT NULL,
          points INTEGER NOT NULL,
          category TEXT NOT NULL,
          attributed_student_name TEXT,
          attributed_class TEXT,
          date TEXT NOT NULL,
          timestamp INTEGER,
          verified_by TEXT,
          is_reversed INTEGER DEFAULT 0,
          reversal_reason TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          role TEXT NOT NULL,
          name TEXT NOT NULL,
          login_name TEXT NOT NULL UNIQUE,
          password_hash TEXT,
          grade INTEGER,
          class_name TEXT,
          faculty_id TEXT,
          role_title TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS achievements (
          id TEXT PRIMARY KEY,
          student_id TEXT,
          student_name TEXT,
          class_name TEXT,
          faculty_id TEXT,
          title TEXT,
          category TEXT,
          description TEXT,
          points_awarded INTEGER,
          date TEXT,
          status TEXT
        );`
      ]);

      // Seed initial faculties if empty
      const facultiesCheck = await this.client.execute('SELECT count(*) as count FROM faculties');
      const count = Number(facultiesCheck.rows[0]?.count || 0);

      if (count === 0) {
        console.log('🌱 [Turso] Seeding initial faculties data...');
        for (const f of this.localFaculties) {
          await this.client.execute({
            sql: `INSERT OR REPLACE INTO faculties (
              id, name, uz_name, symbol, motto, total_points, weekly_change, monthly_change, rank, classes_count, students_count, breakdown_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
              f.id,
              f.name,
              f.uzName,
              f.symbol,
              f.motto,
              f.totalPoints,
              f.weeklyChange,
              f.monthlyChange,
              f.rank,
              f.classesCount,
              f.studentsCount,
              JSON.stringify(f.breakdown),
            ],
          });
        }
      }

      return true;
    } catch (err: any) {
      this.isConnected = false;
      this.connectionError = err.message || 'Unknown Turso error';
      console.warn('⚠️ [Turso] Connection note:', this.connectionError);
      return false;
    }
  }

  public async getStatus(): Promise<TursoDbStatus> {
    let facultyCount = this.localFaculties.length;
    let recordsCount = this.localRecords.length;
    let studentsCount = this.localStudents.length;
    let staffCount = this.localStaff.length;

    if (this.isConnected && this.client) {
      try {
        const fc = await this.client.execute('SELECT count(*) as count FROM faculties');
        const rc = await this.client.execute('SELECT count(*) as count FROM point_records');
        facultyCount = Number(fc.rows[0]?.count || 0);
        recordsCount = Number(rc.rows[0]?.count || 0);
      } catch {
        // use local counts
      }
    }

    return {
      connected: this.isConnected,
      url: TURSO_URL,
      hasToken: Boolean(TURSO_TOKEN),
      mode: this.isConnected ? 'turso_cloud' : 'local_fallback',
      message: this.isConnected
        ? 'Turso Cloud ma’lumotlar bazasi muvaffaqiyatli ulangan'
        : TURSO_TOKEN
        ? `Turso ulanish xatoligi: ${this.connectionError}`
        : 'Turso URL kiritilgan. TURSO_AUTH_TOKEN kutilmoqda, zaxira xotira rejimida ishlayapti',
      tableCounts: {
        faculties: facultyCount,
        point_records: recordsCount,
        students: studentsCount,
        staff: staffCount,
      },
    };
  }

  // Faculties
  public async getFaculties() {
    if (this.isConnected && this.client) {
      try {
        const rs = await this.client.execute('SELECT * FROM faculties ORDER BY rank ASC');
        if (rs.rows.length > 0) {
          return rs.rows.map(row => ({
            id: row.id,
            name: row.name,
            uzName: row.uz_name,
            symbol: row.symbol,
            motto: row.motto,
            totalPoints: Number(row.total_points),
            weeklyChange: Number(row.weekly_change),
            monthlyChange: Number(row.monthly_change),
            rank: Number(row.rank),
            classesCount: Number(row.classes_count),
            studentsCount: Number(row.students_count),
            color: this.localFaculties.find(f => f.id === row.id)?.color,
            breakdown: row.breakdown_json ? JSON.parse(String(row.breakdown_json)) : undefined,
          }));
        }
      } catch (err: any) {
        console.warn('[Turso] Fetch faculties fallback:', err.message);
      }
    }
    return this.localFaculties;
  }

  // Point Records
  public async getPointRecords() {
    if (this.isConnected && this.client) {
      try {
        const rs = await this.client.execute('SELECT * FROM point_records ORDER BY timestamp DESC LIMIT 200');
        if (rs.rows.length > 0) {
          return rs.rows.map(r => ({
            id: r.id,
            transactionCode: r.transaction_code,
            title: r.title,
            reason: r.reason,
            facultyId: r.faculty_id,
            points: Number(r.points),
            category: r.category,
            attributedStudentName: r.attributed_student_name,
            attributedClass: r.attributed_class,
            date: r.date,
            timestamp: Number(r.timestamp),
            verifiedBy: r.verified_by,
            isReversed: Boolean(r.is_reversed),
            reversalReason: r.reversal_reason,
          }));
        }
      } catch (err: any) {
        console.warn('[Turso] Fetch records fallback:', err.message);
      }
    }
    return this.localRecords;
  }

  public async addPointRecord(record: any) {
    this.localRecords = [record, ...this.localRecords];

    // Update faculty total in memory
    const fac = this.localFaculties.find(f => f.id === record.facultyId);
    if (fac) {
      fac.totalPoints += record.points;
      fac.weeklyChange += record.points;
    }

    if (this.isConnected && this.client) {
      try {
        await this.client.execute({
          sql: `INSERT INTO point_records (
            id, transaction_code, title, reason, faculty_id, points, category, attributed_student_name, attributed_class, date, timestamp, verified_by
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            record.id,
            record.transactionCode,
            record.title,
            record.reason,
            record.facultyId,
            record.points,
            record.category,
            record.attributedStudentName || null,
            record.attributedClass,
            record.date,
            record.timestamp,
            record.verifiedBy,
          ],
        });

        if (fac) {
          await this.client.execute({
            sql: 'UPDATE faculties SET total_points = total_points + ?, weekly_change = weekly_change + ? WHERE id = ?',
            args: [record.points, record.points, record.facultyId],
          });
        }
      } catch (err: any) {
        console.warn('[Turso] Insert record failed:', err.message);
      }
    }

    return record;
  }

  public async reverseRecord(recordId: string, reason: string, staffName: string) {
    const rec = this.localRecords.find(r => r.id === recordId);
    if (rec && !rec.isReversed) {
      rec.isReversed = true;
      rec.reversalReason = reason;
      rec.reversedBy = staffName;
      rec.reversedAt = new Date().toLocaleString('uz-UZ');

      const fac = this.localFaculties.find(f => f.id === rec.facultyId);
      if (fac) {
        fac.totalPoints -= rec.points;
        fac.weeklyChange -= rec.points;
      }
    }

    if (this.isConnected && this.client) {
      try {
        await this.client.execute({
          sql: 'UPDATE point_records SET is_reversed = 1, reversal_reason = ? WHERE id = ?',
          args: [reason, recordId],
        });
      } catch (err: any) {
        console.warn('[Turso] Reverse record error:', err.message);
      }
    }

    return rec;
  }
}

export const tursoService = new TursoDatabaseService();
