// Sélection du conteneur de la liste
const raceList = document.querySelector('#race-list');

/**
 * Récupère les données des courses depuis le fichier JSON
 */
const fetchCourses = async () => {
  try {
    const resp = await fetch('./data/races.json');

    if (resp.ok) {
      const data = await resp.json();
      refreshCourses(data);
    } else {
      raceList.innerHTML = `<p>Pas de course disponible</p>`;
    }
  } catch (err) {
    console.error('Erreur lors du chargement des données :', err);
    raceList.innerHTML = `<p>Une erreur est survenue lors du chargement.</p>`;
  }
};

/**
 * Génère et injecte le rendu HTML des cartes de courses
 * @param {Array} data - Tableau d'objets représentant les courses
 */
const refreshCourses = (data) => {
  raceList.innerHTML = "";

  const nomsMois = ["JANV", "FEV", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DEC"];

  data.forEach((el) => {
    // 1. Calcul du statut
    let status;
    let textStatus;

    if (el.registered >= el.maxParticipants) {
      status = "full";
      textStatus = "Complet";
    } else if (el.maxParticipants - el.registered <= 50) {
      status = "warning";
      textStatus = "Presque complet";
    } else {
      status = "available";
      textStatus = "Disponible";
    }

    const isFull = status === "full";

    // 2. Gestion des classes BEM et éléments d'action
    // Classe modificatrice BEM uniquement pour les courses complètes
    const cardModifier = isFull ? " race-card--full" : "";
    
    // Formatage du jour avec un zéro initial si besoin (ex: "08")
    const raceDate = new Date(el.date);
    const day = String(raceDate.getDate()).padStart(2, '0');
    const month = nomsMois[raceDate.getMonth()];

    // 3. Template HTML
    const template = `
      <article class="race-card${cardModifier}" data-race-id="${el.id}">
        <div class="race-card__media">
          <img src="${el.img}" alt="${el.name}">
          <div class="race-card__date">${day} <small>${month}</small></div>
        </div>
        <div class="race-card__body">
          <h3>${el.name}</h3>
          <div class="race-card__meta">
            <span>📍 ${el.city}</span>
            <span>🏃 ${el.distance} km</span>
            <span>👥 ${el.registered} / ${el.maxParticipants} participants</span>
          </div>
          <div class="race-card__footer">
            <span class="badge badge--${status}">${textStatus}</span>
            ${
              !isFull
                ? `<a class="btn btn-primary" href="inscription.html?race=${el.id}">S'inscrire</a>`
                : `<button class="btn" disabled>Complet</button>`
            }
          </div>
        </div>
      </article>
    `;

    raceList.innerHTML += template;
  });
};

fetchCourses();