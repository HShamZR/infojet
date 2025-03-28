# InfoJet

Vos stats Mailjet, claires et lisibles en quelques secondes.

InfoJet est une application web qui permet d'analyser facilement les statistiques d'envoi d'emails depuis Mailjet. L'application traite les fichiers CSV exportés depuis Mailjet et présente les données sous forme de graphiques et statistiques claires.

## Démo

Découvrez InfoJet en action : [https://infojet.vercel.app](https://infojet.hichamzian.be)

## Fonctionnalités

- Import de fichiers CSV Mailjet
- Visualisation des statistiques clés (taux de livraison, ouverture, clic, etc.)
- Filtrage par période (jour, semaine, mois)
- Filtrage par expéditeur
- Export des données filtrées en CSV
- Export des graphiques en PNG
- Génération de rapports PDF détaillés
- Sauvegarde locale des 3 derniers fichiers importés
- Thème clair/sombre automatique
- Interface moderne et réactive
- Traitement 100% côté client (aucune donnée envoyée à un serveur)
- Tableau de données brutes avec statistiques détaillées

## Technologies utilisées

- Vue.js 3 / Nuxt 3
- Pinia pour la gestion d'état
- Chart.js pour les graphiques
- TailwindCSS pour le style
- PapaParse pour l'analyse des fichiers CSV
- jsPDF pour la génération de PDF

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run generate
```

## Utilisation

1. Cliquez sur la zone d'import pour sélectionner un fichier CSV exporté depuis Mailjet
2. Les statistiques s'affichent automatiquement
3. Utilisez les filtres pour affiner les données par période ou expéditeur
4. Accédez aux options d'export via le menu déroulant :
   - Téléchargement des données filtrées en CSV
   - Export des graphiques en PNG
   - Génération d'un rapport PDF complet
5. Retrouvez vos 3 derniers fichiers importés sous la zone d'import
6. Basculez entre le thème clair et sombre via le bouton dans l'en-tête

## Structure du projet

- `assets/` - Fichiers CSS et modules JavaScript 
- `components/` - Composants Vue réutilisables
- `pages/` - Pages de l'application
- `stores/` - Stores Pinia pour la gestion d'état
- `public/` - Fichiers statiques
- `plugins/` - Plugins Vue.js (ex: mode sombre)

## Fonctionnalités détaillées

### Rapports PDF
- En-tête personnalisé avec logo
- Statistiques détaillées avec visualisations
- Graphique des tendances
- Tableau de données brutes
- Mise en page professionnelle

### Sauvegarde locale
- Stockage des 3 derniers fichiers importés
- Rechargement rapide des données
- Aucune donnée stockée sur le serveur
- Effacement automatique au nettoyage du cache

### Interface adaptative
- Design responsive
- Thème clair/sombre automatique
- Animations fluides
- Navigation intuitive
