# Exercice 05 — Remplacer le fichier JSON par une API - step 1

## Contexte

Le site **Je cours pour ma Forme** utilise actuellement le fichier :

```
races.json
```

pour récupérer la liste des courses.

L’objectif est maintenant de remplacer ce fichier statique par une véritable API PHP qui lira je fichier json

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



## Étape 5 — Modifier le frontend

Votre frontend utilise actuellement :

```
fetch('races.json')
```

Modifiez uniquement la source des données afin d'utiliser :

```
fetch('/api/races/')
```

Le reste du fonctionnement doit rester identique.

## Gestion des erreurs

En cas d'erreur serveur, l'API doit retourner un code HTTP approprié et une réponse JSON.

Exemple :

```
{
  "error": "Unable to retrieve races"
}
```

Le frontend doit continuer à afficher un message clair si les données ne peuvent pas être chargées.

## Contraintes

Le fichier `races.json` ne doit plus être utilisé directement par l'application.


L'API doit retourner du JSON valide.

Le frontend ne doit contenir aucune donnée de course écrite en dur.
