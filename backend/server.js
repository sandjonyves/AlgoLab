import express from 'express';
import cors from 'cors';
import commentsRoutes from './routes/comments.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:8080', // Frontend Vite
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/comments', commentsRoutes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend VsAlgo est opérationnel' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
  console.log(`API disponible sur http://localhost:${PORT}/api/comments`);
});

