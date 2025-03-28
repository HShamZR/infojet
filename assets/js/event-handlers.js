/**
 * Configure les gestionnaires d'événements pour le sélecteur de date
 * @param {Object} options - Options de configuration
 * @param {Ref<boolean>} options.showDatePicker - Référence à la visibilité du sélecteur
 * @returns {Function} - Fonction de nettoyage à appeler lors du démontage
 */
export function setupDatePickerEvents({ showDatePicker }) {
  // Gestionnaire pour fermer le sélecteur en cliquant en dehors
  const clickOutsideHandler = (e) => {
    const target = e.target;
    if (!target.closest('.relative') && showDatePicker.value) {
      showDatePicker.value = false;
    }
  };

  // Ajouter l'écouteur d'événement
  document.addEventListener('click', clickOutsideHandler);

  // Retourner une fonction de nettoyage
  return () => {
    document.removeEventListener('click', clickOutsideHandler);
  };
} 