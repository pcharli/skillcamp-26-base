// SkillCamp — Mini-exercice : navigation mobile
//
// Le HTML et le CSS du menu sont déjà fournis.
// À vous d'implémenter son comportement.
//
// Objectifs :
// 1. Récupérer #menu-toggle et #main-nav.
// 2. Écouter le clic sur le bouton.
// 3. Ajouter / retirer la classe "is-open" sur #main-nav.
// 4. Mettre à jour aria-expanded ("true" / "false").
// 5. BONUS : fermer le menu lorsqu'un lien est sélectionné.
// 6. BONUS : fermer le menu avec la touche Escape.
//
// Aucun CSS supplémentaire n'est nécessaire.

// Votre code ici.

const menuBurger = document.querySelector('#menu-toggle')
const navPrincipal = document.querySelector('#main-nav')

menuBurger.addEventListener('click', e => {
    e.preventDefault()
    switchMenu()
})

const switchMenu = () =>  {
   navPrincipal.classList.toggle('is-open')
   const isExpanded = menuBurger.getAttribute('aria-expanded') === 'true';
  menuBurger.setAttribute('aria-expanded', !isExpanded);
}

navPrincipal.addEventListener('click', e => {
    //e.preventDefault()
    if (e.target.tagName == 'A') {
        switchMenu()
    }
})

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // 1. Fermer la navigation mobile (BEM)
    navPrincipal.classList.remove('is-open');

    // 2. Mettre à jour l'accessibilité ARIA
    menuBurger.setAttribute('aria-expanded', 'false');
  }
});
