# Utilisation de l'image officielle Node.js
FROM node:18

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port utilisé par Express
EXPOSE 3000

# Démarrer l'application
CMD npm run start