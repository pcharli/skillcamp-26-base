# Exercice 04 — Afficher la course sélectionnée dans inscription.html

## Contexte

Lorsqu’un utilisateur clique sur le bouton **S’inscrire** d’une course, il est redirigé vers la page :

```
inscription.html?race=2
```

Le paramètre `race` contient l’identifiant de la course sélectionnée.

La page d’inscription ne doit donc pas afficher une course en dur. Elle doit récupérer l’identifiant présent dans l’URL et afficher les bonnes informations.

## Objectif

À l’ouverture de `inscription.html` :

1. récupérer l’identifiant de la course depuis l’URL ;
2. charger les courses depuis `races.json` ;
3. retrouver la course correspondant à cet identifiant ;
4. afficher ses informations dans la page.

## Exemple

Avec l’URL :

```
inscription.html?race=2
```

la page doit afficher les informations de la course dont l’identifiant est :

```
2
```

## Éléments à mettre à jour

La page contient déjà les éléments nécessaires.

Vous devez mettre à jour au minimum :

    <span id="race-name"></span>
	<span id="race-distance"></span>
	<span id="race-registered"></span>
	<span id="race-capacity"></span>


Adaptez également les autres informations présentes dans la page si nécessaire :

* ville ;
* date ;
* statut ;
* nombre de places restantes ;
* image de la course.

## Récupération du paramètre

Vous devez récupérer la valeur du paramètre :

```
race
```

présent dans l’URL.

Exemple :

```
?race=3
```

doit permettre de sélectionner la course ayant l’identifiant `3`.

## Recherche de la course

Après avoir chargé `races.json`, recherchez la course correspondant à l’identifiant reçu dans l’URL.

Attention au type de données :

```
"2" et 2
```

ne sont pas strictement identiques en JavaScript.

## Gestion des erreurs

La page doit également gérer les cas suivants :

* aucun paramètre `race` dans l’URL ;
* identifiant invalide ;
* course inexistante ;
* erreur lors du chargement du fichier JSON.

Dans ces cas, affichez un message clair à l’utilisateur.

Exemple :

```
Cette course n'existe pas.
```

## Contraintes

Vous ne devez pas modifier le CSS.

Les informations de la course ne doivent pas être écrites en dur dans le JavaScript.

Les données doivent provenir de `races.json`.

Votre solution doit fonctionner avec n’importe quelle course présente dans le fichier.

## Bonus

Si l’exercice principal est terminé :

1. calculer automatiquement le nombre de places restantes ;
2. afficher le bon badge selon le taux de remplissage ;
3. désactiver le formulaire si la course est complète ;
4. modifier le titre de la page avec le nom de la course.

Exemple :

```
Inscription — Trail des Lacs
```
