# Exercice 12 — Alimenter l’espace organisateur

## Contexte

Le site **Je cours pour ma Forme** dispose désormais :

* d’utilisateurs ;
* de courses ;
* d’inscriptions ;
* d’un système de connexion ;
* d’un espace profil.

L’objectif est maintenant d’alimenter la page :

```text
admin.html
```

avec les données provenant de l’API.

Les données actuellement présentes dans la page sont uniquement des données de démonstration.

---

## Objectif

Créer un espace organisateur permettant :

1. d’afficher les statistiques générales ;
2. d’afficher la liste des inscriptions ;
3. de rechercher un participant ;
4. de filtrer les inscriptions par course ;
5. de supprimer une inscription.

---

# Partie 1 — Afficher les inscriptions

## Étape 1 — Endpoint

Créez :

```
GET /api/admin/registrations/
```

Cet endpoint doit retourner la liste des inscriptions.

Chaque inscription doit contenir au minimum :


	registrationId
	firstname
	lastname
	email
	raceId
	raceName
	distance
	registeredAt


Exemple :


	[
	    {
	        "registrationId": 12,
	        "firstname": "Julie",
	        "lastname": "Martin",
	        "email": "julie@example.com",
	        "raceId": 2,
	        "raceName": "Trail des Lacs",
	        "distance": 21,
	        "registeredAt": "2026-08-15 14:32:00"
	    }
	]


---

## Étape 2 — Requête SQL

Les informations proviennent de plusieurs tables.

Vous devrez utiliser une requête avec des jointures entre :


	registrations
	users
	races


---

## Étape 3 — Alimenter le tableau

Le tableau de `admin.html` contient :

	<tbody id="participants"></tbody>


Supprimez les lignes écrites en dur.

Au chargement de la page :

1. appelez l’API ;
2. récupérez les inscriptions ;
3. générez les lignes du tableau en JavaScript.

Le tableau doit afficher :

* nom complet ;
* email ;
* course ;
* distance ;
* date d’inscription ;
* bouton de suppression.

---

# Partie 2 — Statistiques

## Étape 4 — Endpoint statistiques

Créez :


GET /api/admin/stats/


L’API doit retourner au minimum :


	{
	    "registrations": 479,
	    "races": 8,
	    "occupancyRate": 81,
	    "updatedAt": "2026-09-02 15:30:00"
	}


---

## Étape 5 — Mettre à jour l’interface

La page contient déjà :


	<div id="stat-registrations"></div>
	<div id="stat-races"></div>
	<div id="stat-occupancy"></div>
	<div id="stat-updated"></div>

Remplacez les valeurs statiques par les données retournées par l’API.

---

# Partie 3 — Recherche

## Étape 6 — Recherche côté frontend

Le champ :


	<input id="participant-search">


doit permettre de rechercher un participant.

La recherche doit fonctionner au minimum sur :


	firstname
	lastname
	email


La liste doit être mise à jour pendant la saisie.

Aucune nouvelle requête API n’est nécessaire pour cette étape.

---

# Partie 4 — Filtrer par course

## Étape 7 — Alimenter le filtre

Le select :


	<select id="race-filter"></select>


ne doit plus contenir de courses écrites en dur.

Chargez les courses depuis :

```
GET /api/races/
```

et générez automatiquement les options.

Conservez une option :

```
Toutes les courses
```

---

## Étape 8 — Filtrage

Lorsque l’organisateur sélectionne une course, affichez uniquement les inscriptions correspondantes.

Le filtre doit pouvoir être combiné avec la recherche.

Exemple :


	Recherche : julie
	Course : Trail des Lacs


doit afficher uniquement les résultats correspondant aux deux critères.

---

# Partie 5 — Supprimer une inscription

## Étape 9 — Suppression

Le bouton :

```
Supprimer
```

doit appeler :

```
DELETE /api/admin/registrations/12
```

où `12` représente l’identifiant de l’inscription.

Après suppression :

* retirez la ligne du tableau ;
* ou rechargez les données depuis l’API ;
* mettez à jour les statistiques.

---

## Étape 10 — Confirmation

Avant la suppression, demandez confirmation à l’organisateur.

Exemple :

```
Voulez-vous vraiment supprimer cette inscription ?
```

---

# Contraintes

Les données ne doivent plus être écrites en dur dans `admin.html`.

Les inscriptions doivent provenir de MySQL.

Les requêtes SQL doivent utiliser PDO.

Les jointures doivent être réalisées côté SQL.

Le frontend doit communiquer avec l’API avec `fetch()`.

Les réponses de l’API doivent être au format JSON.

Les codes HTTP doivent être cohérents.

---

## Bonus 1 — Pagination

La page contient déjà une zone de pagination.

Ajoutez une pagination réelle.

L’API peut accepter :

```
GET /api/admin/registrations/?page=2&limit=10
```

et retourner :


	{
	    "data": [],
	    "pagination": {
	        "page": 2,
	        "limit": 10,
	        "total": 479,
	        "pages": 48
	    }
	}

---

## Bonus 2 — Recherche côté API

Déplacez la recherche vers l’API :

```
GET /api/admin/registrations/?search=julie
```

---

## Bonus 3 — Filtre côté API

Ajoutez :

```
GET /api/admin/registrations/?race=2
```

Puis combinez :

```
GET /api/admin/registrations/?search=julie&race=2&page=1
```

---

## Bonus 4 — Sécuriser l’espace organisateur

Ajoutez un rôle aux utilisateurs :

	user
	admin


L’accès aux endpoints :

```
/api/admin/*
```

doit être refusé à un utilisateur classique.

Retour attendu :

```
403 Forbidden
```

---

## Bonus 5 — Statistiques supplémentaires

Ajoutez par exemple :

* course la plus populaire ;
* course la moins remplie ;
* nombre moyen d’inscriptions par course ;
* nombre d’inscriptions des 7 derniers jours.
