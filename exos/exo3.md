# Exercice 03 — Afficher les courses depuis un fichier JSON

## Contexte

Le site **Je cours pour ma Forme** doit afficher automatiquement la liste des prochaines courses.

Jusqu’à présent, les cartes étaient écrites directement dans le HTML.

Le client souhaite désormais que les courses soient chargées depuis un fichier de données afin d’éviter de modifier le HTML à chaque nouvelle course.

## Fichier de départ

Vous recevez un fichier :

```
races.js
```

Il contient la liste des courses sous forme de tableau JavaScript.

Exemple :


	const races = [
    	{
        	id: 1,
        	name: "Jogging de Charleroi",
        	city: "Charleroi",
        	date: "2026-10-18",
        	distance: 10,
        	maxParticipants: 250,
        	registered: 187
    	}
	];


## Étape 1 — Convertir les données en JSON

Créez un fichier :

```
races.json
```

et transformez le contenu de `races.js` en JSON valide.

Le fichier JSON ne doit contenir que les données.

Le fichier `races.js` ne sera ensuite plus utilisé.

## Étape 2 — Charger les données

Dans votre fichier JavaScript principal, chargez les courses depuis :

```
races.json
```

à l’aide de `fetch()`.

Les données doivent être récupérées lorsque la page est chargée.

## Étape 3 — Générer les cartes

Pour chaque course reçue, créez une carte HTML correspondant au design réalisé lors de l’exercice 01.

La liste des cartes doit être insérée dans :

    <div id="race-list" class="race-grid"></div>

Aucune carte de course ne doit être écrite directement dans le fichier HTML.

## Données à afficher

Pour chaque course, affichez :

* le nom ;
* la ville ;
* la date ;
* la distance ;
* le nombre de participants inscrits ;
* le nombre maximum de participants ;
* le statut de la course ;
* le bouton d’inscription.

## Statut de la course

Le statut doit être calculé à partir du nombre de participants.

### Disponible

La course possède encore suffisamment de places.

Affichez :

```
Disponible
```

avec le style correspondant fourni dans le CSS.

### Presque complet

Il reste moins de 10 % des places disponibles.

Affichez :

```
Presque complet
```

### Complet

Le nombre de participants inscrits est égal au nombre maximum de participants.

Affichez :

```
Complet
```

Dans ce cas, le bouton d’inscription doit être désactivé.

## Nombre de courses

L’élément suivant existe déjà dans la page :

```
<strong id="race-count">0</strong>
```

Mettez automatiquement à jour sa valeur avec le nombre de courses chargées.

## Contraintes

Vous ne devez pas modifier le CSS.

Vous ne devez pas écrire les cartes directement dans le HTML.

Les données doivent provenir du fichier `races.json`.

Votre code doit fonctionner quel que soit le nombre de courses présentes dans le fichier JSON.

## Gestion des erreurs

Si le fichier JSON ne peut pas être chargé, affichez un message dans la zone des courses.

Exemple :

```
Impossible de charger les courses.
```

## Bonus

Si l’exercice principal est terminé :

1. trier les courses par date avant de les afficher ;
2. ne pas afficher les courses dont la date est déjà passée ;
3. formater la date sous la forme :

```
18 OCT.
```

4. ajouter automatiquement un lien vers :

```
inscription.html?race=ID
```

en remplaçant `ID` par l’identifiant de la course.
