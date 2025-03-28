# InfoJet

Vos stats Mailjet, claires et lisibles en quelques secondes.

InfoJet est une application web qui permet d'analyser facilement les statistiques d'envoi d'emails depuis Mailjet. L'application traite les fichiers CSV exportés depuis Mailjet et présente les données sous forme de graphiques et statistiques claires.

## Fonctionnalités

- Import de fichiers CSV Mailjet
- Visualisation des statistiques clés (taux de livraison, ouverture, clic, etc.)
- Filtrage par période (jour, semaine, mois)
- Filtrage par expéditeur
- Export des données filtrées en CSV
- Export des graphiques en PNG
- Interface moderne et réactive
- Traitement 100% côté client (aucune donnée envoyée à un serveur)

## Technologies utilisées

- Vue.js 3 / Nuxt 3
- Pinia pour la gestion d'état
- Chart.js pour les graphiques
- TailwindCSS pour le style
- PapaParse pour l'analyse des fichiers CSV

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## Utilisation

1. Cliquez sur la zone d'import pour sélectionner un fichier CSV exporté depuis Mailjet
2. Les statistiques s'affichent automatiquement
3. Utilisez les filtres pour affiner les données par période ou expéditeur
4. Téléchargez les données filtrées au format CSV ou une image PNG des graphiques

## Structure du projet

- `assets/` - Fichiers CSS et modules JavaScript 
- `components/` - Composants Vue réutilisables
- `pages/` - Pages de l'application
- `stores/` - Stores Pinia pour la gestion d'état
- `public/` - Fichiers statiques
