# Exercice 02 — Menu mobile

## Contexte

Le site **Je cours pour ma Forme** dispose d’une navigation principale.

Sur mobile, cette navigation doit être accessible via un bouton de type **menu burger**.

Le HTML et le CSS nécessaires sont déjà fournis.

Votre tâche consiste à rendre le menu fonctionnel avec **JavaScript**.

## Objectif

Au clic sur le bouton du menu :

* ouvrir la navigation ;
* refermer la navigation lors d’un second clic ;
* mettre à jour l’état du bouton pour l’accessibilité.

## Contraintes

Vous ne devez pas modifier le CSS.

Vous ne devez pas modifier la structure HTML existante.

Votre solution doit être réalisée uniquement en JavaScript.

## Éléments disponibles

Le bouton possède l’identifiant :

```
id="menu-toggle"
```

La navigation possède l’identifiant :

```
id="main-nav"
```

Le CSS prévoit déjà une classe permettant d’afficher le menu :

```
is-open
```

## Comportement attendu

Au chargement de la page, le menu est fermé.

Lors d’un clic sur le bouton :

```
menu fermé
→ clic
→ menu ouvert
```

Puis :

```
menu ouvert
→ clic
→ menu fermé
```

L’attribut `aria-expanded` du bouton doit également refléter l’état du menu :

```
false → menu fermé | 
true  → menu ouvert
```

## Bonus

Si le fonctionnement principal est terminé :

1. fermer le menu lorsqu’un lien de navigation est sélectionné ;
2. fermer le menu avec la touche `Escape` ;
3. mettre à jour le texte de `aria-label` :

```
Ouvrir le menu | 
Fermer le menu
```
