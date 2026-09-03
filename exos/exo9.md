# Exercice 09 — Créer un compte utilisateur

## Contexte

Le site **Je cours pour ma Forme** permet désormais d’enregistrer une inscription à une course.

L’objectif est maintenant de permettre à un participant de créer un véritable compte utilisateur.

Ce compte sera utilisé dans les exercices suivants pour :

* se connecter ;
* accéder à son profil ;
* retrouver ses inscriptions ;
* s’inscrire à de nouvelles courses.

---

## Objectif

Créer un système permettant :

1. de récupérer les informations du formulaire de création de compte ;
2. de les envoyer à l’API ;
3. de valider les données côté serveur ;
4. de sécuriser le mot de passe ;
5. d’enregistrer l’utilisateur dans MySQL ;
6. de retourner une réponse JSON au frontend.

---

## Étape 1 — Table `users`

Créez une table `users`.

Elle doit contenir au minimum :


	id
	firstname
	lastname
	email
	password
	birthdate
	created_at


Exemple de structure :

	CREATE TABLE users (
	    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	    firstname VARCHAR(100) NOT NULL,
	    lastname VARCHAR(100) NOT NULL,
	    email VARCHAR(190) NOT NULL UNIQUE,
	    password VARCHAR(255) NOT NULL,
	    birthdate DATE DEFAULT NULL,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);


L’adresse email doit être unique.

---

## Étape 2 — Formulaire de création de compte

Ajoutez ou utilisez un formulaire contenant au minimum :


	firstname
	lastname
	email
	birthdate
	password
	passwordConfirmation


Le formulaire doit être envoyé avec JavaScript.

Le comportement HTML par défaut doit être empêché.

---

## Étape 3 — Envoyer les données à l’API

Créez l’endpoint :

```
POST /api/users/
```

Les données doivent être envoyées au format JSON.

Exemple :


	{
	    "firstname": "Julie",
	    "lastname": "Martin",
	    "email": "julie@example.com",
	    "birthdate": "1994-04-12",
	    "password": "Secret123!",
	    "passwordConfirmation": "Secret123!"
	}


---

## Étape 4 — Lire le JSON dans PHP

Dans l’API, récupérez le contenu du body de la requête.

Transformez ensuite le JSON en données exploitables par PHP.

---

## Étape 5 — Valider les données

Avant toute insertion en base de données, vérifiez :

* que le prénom est présent ;
* que le nom est présent ;
* que l’email est présent ;
* que l’email est valide ;
* que le mot de passe est présent ;
* que la confirmation du mot de passe correspond ;
* que l’adresse email n’existe pas déjà.

En cas de données invalides, retournez :

```
400 Bad Request
```

Exemple :

```
{
    "error": "Invalid user data"
}
```

---

## Étape 6 — Vérifier si l’utilisateur existe déjà

Recherchez un utilisateur possédant la même adresse email.

Si cette adresse est déjà utilisée, retournez :

```
409 Conflict
```

Exemple :

```
{
    "error": "Email already exists"
}
```

---

## Étape 7 — Sécuriser le mot de passe

Le mot de passe ne doit jamais être enregistré directement dans la base de données.

Utilisez PHP pour créer une version **cryptée** du mot de passe avant son insertion.

Le champ `password` de la base doit contenir uniquement le résultat obtenu après sécurisation.

---

## Étape 8 — Enregistrer l’utilisateur

Utilisez PDO et une requête préparée.

Enregistrez :


	firstname
	lastname
	email
	birthdate
	password


dans la table `users`.

Après la création du compte, retournez :

```
201 Created
```

Exemple :

```
{
    "message": "User created",
    "id": 5
}
```

---

## Étape 9 — Afficher le résultat

Dans le frontend :

* affichez un message de confirmation si le compte est créé ;
* affichez un message d’erreur en cas de problème.

Exemple :

```
Votre compte a bien été créé.
```

---

## Contraintes

Le mot de passe ne doit jamais être stocké en clair.

L’adresse email doit être unique.

L’API doit retourner du JSON.

L’insertion doit utiliser PDO et une requête préparée.

Les données provenant du formulaire ne doivent jamais être concaténées directement dans une requête SQL.

Les codes HTTP doivent être cohérents avec le résultat de la requête.

---

## Bonus 1 — Validation du mot de passe

Ajoutez des règles supplémentaires :

* minimum 8 caractères ;
* au moins une majuscule ;
* au moins une minuscule ;
* au moins un chiffre.

Retournez un message adapté si le mot de passe ne respecte pas les règles.

---

## Bonus 2 — Réponse plus structurée

Retournez une réponse détaillée :


	{
	    "success": true,
	    "message": "User created",
	    "user": {
	        "id": 5,
	        "firstname": "Julie",
	        "lastname": "Martin",
	        "email": "julie@example.com"
	    }
	}


Le mot de passe ne doit évidemment jamais être retourné.

---

## Bonus 3 — Préparer l’exercice suivant

Après la création du compte, préparez le frontend afin de pouvoir rediriger l’utilisateur vers une future page de connexion :

```
login.html
```

L’exercice suivant consistera à authentifier l’utilisateur puis à lui donner accès à son profil.
