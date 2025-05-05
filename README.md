# Auth API

Une API RESTful d'authentification et de gestion des utilisateurs, rôles et permissions, construite avec Node.js, Express, Sequelize et MySQL.

## Technologies

- Node.js & Express
- MySQL avec Sequelize ORM
- Docker & Docker Compose
- JWT pour l'authentification
- Winston pour les logs
- Helmet pour la sécurité
- CORS pour les requêtes cross-origin

## Architecture

```
api/
├── app.js              # Configuration de l'application Express
├── server.js           # Point d'entrée du serveur
├── config/
│   └── database.js     # Configuration Sequelize/MySQL
├── controllers/        # Logique métier
├── middlewares/        # Middlewares personnalisés
├── models/            # Modèles Sequelize
├── routes/            # Routes de l'API
└── utils/             # Utilitaires
```

## Fonctionnalités

### Authentication ([`authController.js`](api/controllers/authController.js))
- POST `/api/auth/register` : Inscription d'un nouvel utilisateur
- POST `/api/auth/login` : Connexion utilisateur

### Gestion des Utilisateurs ([`userController.js`](api/controllers/userController.js))
- POST `/api/users` : Création d'un utilisateur
- GET `/api/users/:id` : Récupération d'un utilisateur
- GET `/api/users/:id/roles` : Liste des rôles d'un utilisateur
- PUT `/api/users/:id` : Mise à jour des informations
- PUT `/api/users/:id/password` : Modification du mot de passe
- DELETE `/api/users/:id` : Suppression d'un utilisateur
- POST `/api/users/addRole` : Ajout d'un rôle
- POST `/api/users/removeRole` : Retrait d'un rôle

### Gestion des Rôles ([`roleController.js`](api/controllers/roleController.js))
- POST `/api/roles` : Création d'un rôle
- GET `/api/roles` : Liste des rôles
- GET `/api/roles/:id` : Détails d'un rôle
- GET `/api/roles/:id/permissions` : Liste des permissions d'un rôle
- PUT `/api/roles/:id` : Mise à jour d'un rôle
- DELETE `/api/roles/:id` : Suppression d'un rôle
- POST `/api/roles/addPermission` : Ajout d'une permission
- POST `/api/roles/removePermission` : Retrait d'une permission

### Gestion des Permissions ([`permissionController.js`](api/controllers/permissionController.js))
- POST `/api/permissions` : Création d'une permission
- GET `/api/permissions` : Liste des permissions
- GET `/api/permissions/:id` : Détails d'une permission
- PUT `/api/permissions/:id` : Mise à jour d'une permission
- DELETE `/api/permissions/:id` : Suppression d'une permission

## Sécurité

- Authentification JWT ([`authMiddleware.js`](api/middlewares/authMiddleware.js))
- Vérification des permissions ([`checkPermission.js`](api/middlewares/checkPermission.js))
- Gestion globale des erreurs ([`errorHandler.js`](api/middlewares/errorHandler.js))
- Protection CORS et autres sécurités via Helmet ([`app.js`](api/app.js))

## Configuration

Le fichier [`.env`](.env) permet de configurer :
- Paramètres serveur (PORT, NODE_ENV)
- Configuration base de données
- Secrets JWT
- Paramètres de logging
- Rate limiting
- Cache

## Docker

L'application peut être déployée via Docker avec :
- [`Dockerfile`](Dockerfile) pour l'API
- [`docker-compose.yml`](docker-compose.yml) pour orchestrer l'API et MySQL

## Installation

1. Cloner le repository
2. Copier `.env.example` vers `.env` et configurer les variables
3. Lancer avec Docker :
```bash
docker-compose up -d
```

Ou lancer localement :
```bash
npm install
npm run dev
```
