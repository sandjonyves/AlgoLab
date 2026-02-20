import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

// Charger les variables d'environnement
dotenv.config();

// URL de connexion PostgreSQL
const databaseUrl = process.env.DATABASE_URL || 
  'postgresql://neondb_owner:npg_Oc0rgRe2pwbP@ep-small-bird-ai21f31n-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Créer le pool de connexions PostgreSQL
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false // Nécessaire pour Neon PostgreSQL
  }
});

// Tester la connexion
pool.on('connect', () => {
  console.log('Connexion à la base de données PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('Erreur inattendue sur le client PostgreSQL:', err);
  process.exit(-1);
});

// Créer la table comments si elle n'existe pas
const createTable = async () => {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(255) PRIMARY KEY,
        message TEXT NOT NULL,
        page_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table comments créée ou déjà existante');
    
    // Vérifier que la table existe
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'comments'
      );
    `);
    console.log('Vérification table:', checkResult.rows[0].exists ? 'Existe' : 'N\'existe pas');
  } catch (err) {
    console.error('Erreur lors de la création de la table:', err.message);
    console.error('Détails:', err);
    throw err;
  }
};

// Initialiser la table au démarrage
createTable().catch(err => {
  console.error('Impossible d\'initialiser la base de données:', err);
  process.exit(1);
});

export default pool;

