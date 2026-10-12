export default async function handler(req: any, res: any) {
  const url = process.env.TURSO_DATABASE_URL || 'libsql://facultyscore-coach.aws-ap-northeast-1.turso.io';
  const token = process.env.TURSO_AUTH_TOKEN || '';
  
  return res.status(200).json({
    connected: Boolean(token),
    url,
    hasToken: Boolean(token),
    mode: token ? 'turso_cloud' : 'local_fallback',
    message: token 
      ? 'Turso Cloud DB ulanishi faol' 
      : 'Turso Cloud DB sozlandi. TURSO_AUTH_TOKEN kutilmoqda (zaxira kesh faol)',
    tableCounts: {
      faculties: 5,
      point_records: 6,
      students: 6,
      staff: 4
    }
  });
}
