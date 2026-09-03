# Exercice 01 — Construire une carte de course

## Contexte

Le site **Je cours pour ma Forme** doit afficher une liste de courses à venir.

Le design général du site et les styles CSS sont déjà fournis.

Votre tâche consiste à reproduire en HTML une carte de course à partir :

* d’une capture d’écran de référence ;
* du fichier `styleguide.html` ;
* du fichier `style.css` déjà fourni.

Vous ne devez pas modifier le CSS.

## Objectif

Créer le code HTML correspondant à une carte de course.

La carte doit contenir au minimum :

* une image ;
* la date de la course ;
* le nom de la course ;
* la ville ;
* la distance ;
* le nombre de participants inscrits ;
* le nombre maximum de participants ;
* un badge de statut ;
* un bouton d’inscription.

## Contraintes

Le CSS est déjà fourni.

Vous devez donc identifier et réutiliser les classes existantes dans `style.css` et `styleguide.html`.

Aucun style inline ne doit être ajouté.

Vous ne pouvez pas ajouter de nouvelle règle CSS.

Le HTML doit être valide, lisible et correctement structuré.

## Données à afficher

- Nom : Trail des Lacs
- Ville : Froidchapelle
- Date : 08 novembre 2026
- Distance : 21 km
- Participants : 142 / 150
- Statut : Presque complet
- Bouton : S’inscrire

## Résultat attendu

Votre carte doit correspondre le plus fidèlement possible à la capture d’écran fournie.

Une fois terminée, insérez votre carte dans l’élément :

    <div id="race-list" class="race-grid">
     <!-- Votre carte ici -->
    </div>

## Bonus

Si votre carte est terminée :

1. dupliquez-la ;
2. créez une deuxième course ;
3. adaptez uniquement le contenu HTML ;
4. utilisez un autre statut disponible dans le styleguide.
