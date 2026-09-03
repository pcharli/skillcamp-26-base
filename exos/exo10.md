# Exercice 10 — Se connecter et accéder à son profil

## Contexte

Le site **Je cours pour ma Forme** permet maintenant de créer un compte utilisateur.

L’objectif est de permettre à un utilisateur existant de :

* se connecter ;
* ouvrir une session ;
* accéder à son profil ;
* récupérer ses informations depuis l’API ;
* se déconnecter.

---

## Objectif

Mettre en place un système d’authentification basé sur les sessions PHP.

Le système doit permettre :


	email + mot de passe
	        ↓
	POST /api/login/
	        ↓
	vérification utilisateur
	        ↓
	session PHP
	        ↓
	GET /api/profile/
	        ↓
	profil.html


---

## Étape 1 — Formulaire de connexion

Créez une page :

```
login.html
```

Elle contient au minimum un formulaire avec 2 champs :

```
email
password
```

Le formulaire doit être envoyé avec JavaScript.

Le comportement HTML par défaut doit être empêché.

---

## Étape 2 — Envoyer les identifiants à l’API

Créez l’endpoint :

```
POST /api/login/
```

Les données doivent être envoyées au format JSON.

Exemple :


	{
	    "email": "julie@example.com",
	    "password": "Secret123!"
	}


---

## Étape 3 — Rechercher l’utilisateur

Dans PHP :

1. récupérez les données JSON ;
2. vérifiez que l’email et le mot de passe sont présents ;
3. recherchez l’utilisateur correspondant à l’adresse email.

Utilisez PDO et une requête préparée.

Si l’utilisateur n’existe pas, la connexion doit être refusée.

---

## Étape 4 — Vérifier le mot de passe

Le mot de passe enregistré en base de données est crypté.

Vous ne pouvez donc pas comparer directement :

```
$password === $user['password']
```

Utilisez la fonction PHP adaptée pour vérifier le mot de passe fourni par l’utilisateur.

Si le mot de passe est incorrect, retournez :

```
401 Unauthorized
```

Exemple :

```
{
    "error": "Invalid credentials"
}
```

Pour des raisons de sécurité, utilisez le même message si :

* l’email n’existe pas ;
* le mot de passe est incorrect.

---

## Étape 5 — Créer la session

Lorsque les identifiants sont corrects, démarrez une session PHP.

Enregistrez au minimum l’identifiant de l’utilisateur connecté dans la session.

Exemple :

```
$_SESSION['user_id'] = $user['id'];
```

Retournez ensuite :

```
200 OK
```

Exemple :

```
{
    "message": "Login successful"
}
```

Le mot de passe ne doit jamais être retourné.

---

## Étape 6 — Redirection après connexion

Dans le frontend, si la connexion réussit, redirigez l’utilisateur vers :

```
profil.html
```

En cas d’erreur, affichez un message dans le formulaire.

Exemple :

```
Email ou mot de passe incorrect.
```

---

# Partie 2 — Accéder au profil

## Étape 7 — Endpoint du profil

Créez :

```
GET /api/profile/
```

Cet endpoint doit être accessible uniquement à un utilisateur connecté.

Il doit :

1. démarrer la session ;
2. vérifier que `user_id` existe dans la session ;
3. rechercher l’utilisateur dans la base de données ;
4. retourner ses informations au format JSON.

Exemple :


	{
	    "id": 5,
	    "firstname": "Julie",
	    "lastname": "Martin",
	    "email": "julie@example.com",
	    "birthdate": "1994-04-12"
	}


Le mot de passe ne doit jamais être présent dans la réponse.

---

## Étape 8 — Accès non autorisé

Si aucun utilisateur n’est connecté, retournez :

```
401 Unauthorized
```

avec :

```
{
    "error": "Authentication required"
}
```

---

## Étape 9 — Alimenter `profil.html`

La page `profil.html` contient actuellement des informations écrites en dur.

Supprimez ces données statiques.

Au chargement de la page :

1. appelez :

```
GET /api/profile/
```

2. récupérez les informations de l’utilisateur ;
3. affichez-les dans la page.

Affichez au minimum :

* prénom ;
* nom ;
* email ;
* date de naissance.

---

## Étape 10 — Protéger la page

Si l’API retourne :

```
401 Unauthorized
```

redirigez l’utilisateur vers :

```
login.html
```

Le frontend ne doit donc pas considérer que l’utilisateur est connecté uniquement parce qu’il se trouve sur `profil.html`.

La session côté serveur reste la source de vérité.

---

# Partie 3 — Déconnexion

## Étape 11 — Endpoint logout

Créez :

```
POST /api/logout/ || DELETE /api/login/
```

Cet endpoint doit supprimer la session de l’utilisateur.

Retournez ensuite :

```
200 OK
```

Exemple :

```
{
    "message": "Logout successful"
}
```

---

## Étape 12 — Bouton de déconnexion

Le bouton :

```
Se déconnecter
```

présent dans `profil.html` doit appeler l’endpoint de déconnexion.

Après une déconnexion réussie, redirigez l’utilisateur vers :

```
login.html
```

---

## Contraintes

L’authentification doit utiliser une session PHP.

L’identifiant de l’utilisateur connecté doit être conservé côté serveur.

Le mot de passe doit être vérifié avec la fonction PHP appropriée.

Le mot de passe ne doit jamais être envoyé dans une réponse JSON.

Toutes les requêtes SQL doivent utiliser PDO et des requêtes préparées.

L’endpoint `/api/profile/` doit refuser l’accès à un utilisateur non connecté.

Les codes HTTP doivent être cohérents.

---

## Codes HTTP attendus


	200 OK
	Connexion réussie
	
	400 Bad Request
	Données manquantes
	
	401 Unauthorized
	Identifiants incorrects
	ou utilisateur non connecté


---

## Bonus 1 — Régénérer l’identifiant de session

Après une connexion réussie, régénérez l’identifiant de session avant d’enregistrer l’utilisateur connecté.

---

## Bonus 2 — Vérifier l’état de connexion

Créez un endpoint :

```
GET /api/session/
```

qui retourne par exemple :

```
{
    "authenticated": true
}
```

ou :

```
{
    "authenticated": false
}
```

---

## Bonus 3 — Navigation dynamique

Adaptez la navigation du site.

Utilisateur non connecté :

```
Accueil -> Courses -> Connexion
```

Utilisateur connecté :

```
Accueil -> Courses -> Mon profil -> Déconnexion
```

---

## Bonus 4 — Message après redirection

Si un utilisateur tente d’accéder au profil sans être connecté, affichez sur la page de connexion :

```
Veuillez vous connecter pour accéder à votre profil.
```
