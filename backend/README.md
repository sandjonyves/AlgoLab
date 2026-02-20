# Backend VsAlgo - API Commentaires

Backend Express pour la gestion des commentaires de l'application VsAlgo.

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du dossier `backend/` avec la variable suivante :

```env
DATABASE_URL=postgresql://neondb_owner:npg_Oc0rgRe2pwbP@ep-small-bird-ai21f31n-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Si la variable `DATABASE_URL` n'est pas définie, l'URL par défaut sera utilisée.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

Pour le mode développement avec rechargement automatique :

```bash
npm run dev
```

Le serveur démarre sur le port **3001** par défaut.

## API Endpoints

### GET /api/comments
Récupère tous les commentaires triés par date décroissante.

**Réponse :**
```json
[
  {
    "id": "string",
    "message": "string",
    "page_url": "string",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### POST /api/comments
Crée un nouveau commentaire.

**Body :**
```json
{
  "message": "string",
  "page_url": "string"
}
```

**Réponse :**
```json
{
  "id": "string",
  "message": "string",
  "page_url": "string",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### DELETE /api/comments/:id
Supprime un commentaire par son ID.

**Réponse :**
```json
{
  "message": "Commentaire supprimé avec succès"
}
```

## Base de données

Le backend utilise PostgreSQL (Neon) pour stocker les commentaires.

La table `comments` est créée automatiquement au démarrage avec la structure suivante :

```sql
CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(255) PRIMARY KEY,
  message TEXT NOT NULL,
  page_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

