# Exercice 05 — Remplacer le fichier JSON par une API - step 2

## Contexte

L'API de  **Je cours pour ma Forme** utilise actuellement le fichier :

```
races.json
```

pour récupérer la liste des courses.

L’objectif est maintenant de remplacer ce fichier statique par une  base de données MySQL.

Le comportement du frontend ne doit pas changer visuellement.

## Objectifs

Créer une API capable de retourner :

```
GET /api/races/
```

La réponse doit contenir la liste des courses au format JSON.

Exemple :

```json
[
  {
    "id": 1,
    "name": "Jogging de Charleroi",
    "city": "Charleroi",
    "date": "2026-10-18",
    "distance": 10,
    "maxParticipants": 250,
    "registered": 187
  }
]
```

## Étape 1 — Base de données

Créez une table `races` dans MySQL.

Elle doit permettre de stocker au minimum :

* l'identifiant ;
* le nom ;
* la ville ;
* la date ;
* la distance ;
* le nombre maximum de participants ;
* l'image.

Importez ensuite les courses utilisées précédemment dans `races.json`.

## Étape 2 — Connexion à MySQL

Créez un fichier PHP permettant d'établir une connexion à MySQL avec PDO.

La connexion devra utiliser :

	Host     : mysql
	Database : je_cours
	User     : jcpf
	Password : jcpf


La connexion doit utiliser l'encodage `utf8mb4`.

## Étape 3 — Endpoint

Créez l'endpoint :

```
GET /api/races/
```

Celui-ci doit :

1. interroger la base de données ;
2. récupérer les courses ;
3. les trier par date ;
4. retourner le résultat au format JSON.

La réponse HTTP doit indiquer que le contenu retourné est du JSON.

## Étape 4 — Nombre d'inscriptions

Le nombre de participants ne doit pas être stocké directement dans la table `races`.

Il devra être calculé à partir des inscriptions présentes dans la base.

Pour l'instant, si aucune table d'inscription n'existe encore, vous pouvez retourner :

```
"registered": 0
```

Cette partie sera améliorée dans un exercice ultérieur.

Le frontend doit continuer à afficher un message clair si les données ne peuvent pas être chargées.

## Contraintes

Le fichier `races.json` ne doit plus être utilisé par l'application.

Les données doivent provenir de MySQL.

La connexion à la base doit utiliser PDO.

L'API doit retourner du JSON valide.

Le frontend ne doit contenir aucune donnée de course écrite en dur.
