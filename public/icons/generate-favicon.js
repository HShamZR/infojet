// Script à exécuter dans le navigateur pour générer le favicon.ico
// Ouvrez ce fichier dans le navigateur, puis exécutez ce script dans la console

const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

// Fond transparent
ctx.clearRect(0, 0, 32, 32);

// Dessiner l'avion en papier
ctx.strokeStyle = '#8b5cf6'; // Violet
ctx.lineWidth = 2;
ctx.beginPath();

// Ajuster les coordonnées pour centrer dans un canvas 32x32
const scale = 32/24; // Le SVG est en 24x24, nous convertissons en 32x32
const offsetX = 0;
const offsetY = 0;

// Dessiner le chemin de l'avion
ctx.moveTo(12*scale+offsetX, 19*scale+offsetY);
ctx.lineTo(21*scale+offsetX, 21*scale+offsetY);
ctx.lineTo(12*scale+offsetX, 3*scale+offsetY);
ctx.lineTo(3*scale+offsetX, 21*scale+offsetY);
ctx.lineTo(12*scale+offsetX, 19*scale+offsetY);
ctx.moveTo(12*scale+offsetX, 19*scale+offsetY);
ctx.lineTo(12*scale+offsetX, 11*scale+offsetY);

ctx.stroke();

// Convertir en base64 pour pouvoir télécharger
const dataURL = canvas.toDataURL('image/png');
console.log(dataURL);

// Créer un lien de téléchargement
const link = document.createElement('a');
link.href = dataURL;
link.download = 'favicon.png';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

// Instructions pour convertir en favicon.ico
console.log("Après avoir téléchargé le PNG, utilisez un convertisseur en ligne comme https://www.favicon.cc/ pour le convertir en .ico"); 