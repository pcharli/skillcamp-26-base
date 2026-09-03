# Exercice 08 — Enregistrer une inscription

## Contexte

La page `inscription.html` permet actuellement d'afficher la course sélectionnée.

L'utilisateur peut compléter un formulaire contenant ses informations personnelles.

L'objectif est maintenant d'envoyer ces informations à l'API afin d'enregistrer l'inscription dans la base de données MySQL.

---

## Objectif

Lors de la soumission du formulaire :

1. récupérer les données saisies ;
2. récupérer l'identifiant de la course sélectionnée ;
3. envoyer les données à l'API avec `fetch()` ;
4. récupérer les données dans PHP ;
5. valider les données reçues ;
6. insérer l'inscription dans MySQL ;
7. retourner une réponse JSON au frontend.

---

## Étape 1 — Table `registrations`

Créez une table permettant de stocker les inscriptions.

Elle doit contenir au minimum :

* un identifiant ;
* l'identifiant de la course ;
* le prénom ;
* le nom ;
* l'adresse email ;
* la date de naissance ;
* la date de création de l'inscription.

Exemple de structure :


	CREATE TABLE registrations (
	    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	    race_id INT UNSIGNED NOT NULL,
	    firstname VARCHAR(100) NOT NULL,
	    lastname VARCHAR(100) NOT NULL,
	    email VARCHAR(190) NOT NULL,
	    birthdate DATE NOT NULL,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	    FOREIGN KEY (race_id)
	        REFERENCES races(id)
	        ON DELETE CASCADE
	);


---

## Étape 2 — Récupérer les données du formulaire

Lors de la soumission du formulaire, empêchez le comportement par défaut du navigateur.

Récupérez ensuite les valeurs suivantes :

- firstname
- lastname
- email
- birthdate
- raceId

L'identifiant de la course doit provenir de l'URL de la page.

Exemple :

```
inscription.html?race=2
```

doit produire :

```
raceId = 2
```

---

## Étape 3 — Envoyer les données à l'API

Créez l'endpoint :

```
POST /api/registrations/
```

Envoyez les informations au format JSON.

Exemple de données envoyées :

	{
	    "firstname": "Julie",
	    "lastname": "Martin",
	    "email": "julie@example.com",
	    "birthdate": "1994-04-12",
	    "raceId": 2
	}


La requête doit indiquer que son contenu est au format JSON.

---

## Étape 4 — Lire les données dans PHP

Dans l'API, récupérez le contenu envoyé dans le body de la requête.

Les données reçues sont au format JSON.

Transformez-les en données utilisables par PHP.

---

## Étape 5 — Validation

Avant d'enregistrer l'inscription, vérifiez au minimum que :

* le prénom est présent ;
* le nom est présent ;
* l'email est présent ;
* l'email est valide ;
* la date de naissance est présente ;
* l'identifiant de la course est présent.

Si les données sont incorrectes, l'API doit retourner :

```
400 Bad Request
```

Exemple :

```
{
    "error": "Invalid registration data"
}
```

---

## Étape 6 — Vérifier la course

Avant d'insérer l'inscription, vérifiez que la course existe dans la table `races`.

Si elle n'existe pas, retournez :

```
404 Not Found
```

Exemple :

```
{
    "error": "Race not found"
}
```

---

## Étape 7 — Insérer l'inscription

Utilisez PDO et une requête préparée pour enregistrer l'inscription.

Les données provenant directement du formulaire ne doivent jamais être concaténées dans une requête SQL.

Une fois l'inscription enregistrée, retournez :

```
201 Created
```

avec par exemple :

```
{
    "message": "Registration created",
    "id": 12
}
```

---

## Étape 8 — Afficher le résultat

Dans le frontend, récupérez la réponse de l'API.

Si l'inscription est réussie, affichez un message de confirmation dans la page.

Exemple :

```
Votre inscription a bien été enregistrée.
```

Si une erreur survient, affichez un message adapté.

---

## Contraintes

L'enregistrement doit être réalisé via l'API.

Le JavaScript ne doit pas accéder directement à MySQL.

Les données doivent être envoyées au format JSON.

L'API doit retourner du JSON.

L'insertion doit utiliser une requête préparée PDO.

Les codes HTTP doivent être cohérents avec le résultat de la requête.

---

## Bonus 1 — Éviter les doubles inscriptions

Un participant ne peut pas s'inscrire deux fois à la même course avec la même adresse email.

Si une inscription existe déjà pour cette adresse email et cette course, retournez :

```
409 Conflict
```

avec :

```
{
    "error": "Already registered"
}
```

---

## Bonus 2 — Course complète

Avant d'enregistrer l'inscription :

1. récupérez le nombre d'inscriptions existantes pour la course ;
2. comparez-le avec `max_participants`.

Si la course est complète, retournez :

```
409 Conflict
```

avec :

```
{
    "error": "Race is full"
}
```

---

## Bonus 3 — Mise à jour du nombre de participants

Votre endpoint :

```
GET /api/races/
```

retournait précédemment :

```
{
    "registered": 0
}
```

Modifiez maintenant la requête SQL afin que `registered` corresponde au nombre réel d'inscriptions pour chaque course.
