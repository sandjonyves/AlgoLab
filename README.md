# VsAlgo - Application d'apprentissage de l'algorithmique

Application web complète pour apprendre l'algorithmique en français avec un éditeur de code, un système d'apprentissage interactif et des mini-jeux éducatifs.

## Structure du projet

```
.
├── frontend/          # Application React/TypeScript
├── backend/          # API Express avec PostgreSQL
└── README.md         # Ce fichier
```

## Technologies utilisées

### Frontend
- React 18.3 + TypeScript
- Vite 5.4
- Tailwind CSS + shadcn/ui
- Monaco Editor
- Zustand pour la gestion d'état
- React Router DOM

### Backend
- Express.js
- PostgreSQL (Neon)
- Node.js

## Prérequis

- Node.js 18+ et npm
- PostgreSQL (ou compte Neon)

## Installation

### 1. Cloner le repository

```bash
git clone <url-du-repo>
cd tp-ens
```

### 2. Installer les dépendances

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

## Configuration

### Backend

Créez un fichier `.env` dans le dossier `backend/` :

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
PORT=3001
```

### Frontend

Créez un fichier `.env` dans le dossier `frontend/` (optionnel) :

```env
VITE_API_URL=http://localhost:3001
```

## Démarrage

### Démarrer le backend

```bash
cd backend
npm start
```

Le serveur démarre sur `http://localhost:3001`

### Démarrer le frontend

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:8080`

## Fonctionnalités

### Éditeur de code
- Écriture d'algorithmes en syntaxe française
- Exécution en temps réel
- Mode pas à pas
- Visualisation de la mémoire
- Console de sortie

### Espace d'apprentissage
- Modules pédagogiques structurés
- Leçons interactives
- Quiz et exercices pratiques
- Système de progression (XP, niveaux, badges)
- Suivi de la série quotidienne

### Variable Quest
- Mini-jeu éducatif sur les variables
- 6 niveaux progressifs
- Système d'étoiles et certificat

### Système de commentaires
- Commentaires utilisateurs
- Dashboard d'administration
- Stockage dans PostgreSQL

## API Endpoints

### GET /api/comments
Récupère tous les commentaires

### POST /api/comments
Crée un nouveau commentaire
```json
{
  "message": "string",
  "page_url": "string"
}
```

### DELETE /api/comments/:id
Supprime un commentaire

## Scripts disponibles

### Frontend
- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run lint` - Linting ESLint

### Backend
- `npm start` - Démarre le serveur
- `npm run dev` - Mode développement avec rechargement automatique

## Structure des dossiers

### Frontend
- `src/pages/` - Pages principales
- `src/components/` - Composants React
- `src/engine/` - Moteur d'exécution (lexer, parser, interpreter)
- `src/stores/` - Gestion d'état (Zustand)
- `src/data/` - Données pédagogiques

### Backend
- `routes/` - Routes API
- `models/` - Modèles de données
- `config/` - Configuration (base de données)

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

ISC

## Auteur

VsAlgo Team

# AlgoLab
