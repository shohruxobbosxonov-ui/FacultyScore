import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { tursoService } from './server/turso.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Initialize Turso DB connection in background
  tursoService.initializeDatabase().catch(err => {
    console.warn('[Turso] Database initialization notice:', err);
  });

  // API Endpoints
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  // Turso status endpoint
  app.get('/api/turso/status', async (req, res) => {
    try {
      const status = await tursoService.getStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Faculties
  app.get('/api/faculties', async (req, res) => {
    try {
      const faculties = await tursoService.getFaculties();
      res.json(faculties);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Point Records
  app.get('/api/records', async (req, res) => {
    try {
      const records = await tursoService.getPointRecords();
      res.json(records);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/records', async (req, res) => {
    try {
      const record = req.body;
      const saved = await tursoService.addPointRecord(record);
      res.json(saved);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/records/:id/reverse', async (req, res) => {
    try {
      const { id } = req.params;
      const { reason, staffName } = req.body;
      const updated = await tursoService.reverseRecord(id, reason, staffName);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Production vs Dev
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite dev middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FacultyScore full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
