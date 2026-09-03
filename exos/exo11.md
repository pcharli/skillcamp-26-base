# Exercice 11 — Gérer les inscriptions de l’utilisateur connecté

## Contexte

Le site **Je cours pour ma Forme** permet maintenant :

* de créer un compte ;
* de se connecter ;
* d’accéder à son profil.

L’objectif est désormais de relier les inscriptions aux utilisateurs connectés.

Une inscription ne doit plus contenir directement le prénom, le nom ou l’email du participant.

Elle doit simplement relier :


	un utilisateur
	à
	une course


---

## Objectif

Permettre à un utilisateur connecté de :

1. s’inscrire à une course ;
2. voir ses inscriptions dans son profil ;
3. se désinscrire d’une course.

---

# Partie 1 — Adapter la base de données

## Étape 1 — Modifier la table `registrations`

La table `registrations` doit maintenant contenir au minimum :


	id
	user_id
	race_id
	created_at


Exemple :


	CREATE TABLE registrations (
	    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	    user_id INT UNSIGNED NOT NULL,
	    race_id INT UNSIGNED NOT NULL,
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	    CONSTRAINT fk_registration_user
	        FOREIGN KEY (user_id)
	        REFERENCES users(id)
	        ON DELETE CASCADE,
	
	    CONSTRAINT fk_registration_race
	        FOREIGN KEY (race_id)
	        REFERENCES races(id)
	        ON DELETE CASCADE,
	
	    UNIQUE (user_id, race_id)
	);


La contrainte :

```
UNIQUE (user_id, race_id)
```

empêche un utilisateur de s’inscrire deux fois à la même course.

---

# Partie 2 — Inscription à une course

## Étape 2 — Modifier le formulaire d’inscription

La page `inscription.html` connaît déjà l’identifiant de la course grâce à l’URL :

```
inscription.html?race=2
```

Lors de la soumission du formulaire, le frontend ne doit plus envoyer :


	firstname
	lastname
	email
	birthdate


L’utilisateur est déjà identifié grâce à sa session.

Il suffit donc d’envoyer l’identifiant de la course.

Exemple :

```
{
    "raceId": 2
}
```

---

## Étape 3 — Endpoint d’inscription

Créez ou adaptez :

```
POST /api/registrations/
```

Cet endpoint doit :

1. démarrer la session ;
2. vérifier qu’un utilisateur est connecté ;
3. récupérer son `user_id` depuis la session ;
4. récupérer `raceId` dans le body JSON ;
5. vérifier que la course existe ;
6. vérifier que la course n’est pas complète ;
7. vérifier que l’utilisateur n’est pas déjà inscrit ;
8. enregistrer l’inscription.

---

## Étape 4 — Utilisateur non connecté

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

Le frontend peut alors rediriger l’utilisateur vers :

```
login.html
```

---

## Étape 5 — Inscription réussie

Si tout est correct, insérez :


	user_id
	race_id


dans la table `registrations`.

Retournez :

```
201 Created
```

avec par exemple :

```
{
    "message": "Registration created"
}
```

---

## Étape 6 — Double inscription

Si l’utilisateur est déjà inscrit à cette course, retournez :

```
409 Conflict
```

avec :


	{
	    "error": "Already registered"
	}


---

## Étape 7 — Course complète

Avant d’insérer l’inscription, comptez le nombre d’inscriptions déjà enregistrées pour cette course.

Comparez ce nombre avec :

```
max_participants
```

Si la course est complète, retournez :

```
409 Conflict
```

avec :


	{
	    "error": "Race is full"
}


---

# Partie 3 — Afficher les inscriptions dans le profil

## Étape 8 — Endpoint des inscriptions de l’utilisateur

Créez :

```
GET /api/profile/registrations/
```

Cet endpoint doit :

1. vérifier la session ;
2. récupérer l’identifiant de l’utilisateur connecté ;
3. récupérer toutes ses inscriptions ;
4. récupérer les informations des courses correspondantes ;
5. retourner le résultat au format JSON.

La requête SQL devra utiliser une jointure entre :


	registrations
	races


Exemple de réponse :

	[
	    {
	        "registrationId": 12,
	        "raceId": 2,
	        "name": "Trail des Lacs",
	        "city": "Froidchapelle",
	        "date": "2026-11-08",
	        "distance": 21,
	        "registeredAt": "2026-09-02 14:32:10"
	    },
	    {
	        "registrationId": 18,
	        "raceId": 3,
	        "name": "Urban Night Run",
	        "city": "Namur",
	        "date": "2026-11-22",
	        "distance": 10,
	        "registeredAt": "2026-09-02 15:04:22"
	    }
	]


---

## Étape 9 — Alimenter `profil.html`

La zone :


	<div id="my-registrations" class="registration-list"></div>


doit maintenant être générée avec JavaScript.

Au chargement du profil :

1. appelez :

```
GET /api/profile/registrations/
```

2. parcourez les inscriptions reçues ;
3. générez les éléments HTML correspondants ;
4. mettez à jour le compteur d’inscriptions.

Le profil ne doit plus contenir de courses écrites en dur.

---

## Étape 10 — Profil sans inscription

Si l’utilisateur n’est inscrit à aucune course, affichez un état vide.

Exemple :

```
Vous n’êtes inscrit à aucune course.
```

Vous pouvez réutiliser le composant prévu dans `styleguide.html`.

---

# Partie 4 — Se désinscrire

## Étape 11 — Endpoint de suppression

Créez :

```
DELETE /api/registrations/12
```

où `12` correspond à l’identifiant de l’inscription.

Cet endpoint doit :

1. vérifier que l’utilisateur est connecté ;
2. récupérer l’identifiant de l’inscription ;
3. vérifier que cette inscription appartient bien à l’utilisateur connecté ;
4. supprimer l’inscription.

---

## Étape 12 — Sécurité

Un utilisateur ne doit jamais pouvoir supprimer l’inscription d’un autre utilisateur.

Par exemple, si l’utilisateur connecté possède :

```
user_id = 5
```

il ne doit pas pouvoir supprimer une inscription appartenant à :

```
user_id = 8
```

Si l’inscription n’existe pas ou n’appartient pas à l’utilisateur connecté, retournez :

```
404 Not Found
```

	{
	    "error": "Registration not found"
	}


---

## Étape 13 — Suppression réussie

Après suppression, retournez :

```
200 OK
```

avec :

```
	{
	    "message": "Registration deleted"
	}
```

---

## Étape 14 — Mettre à jour le profil

Lorsqu’un utilisateur clique sur :

```
Se désinscrire
```

le frontend doit appeler l’API avec la méthode :

```
DELETE
```

Après une suppression réussie :

* retirez l’inscription de la page ;
* ou rechargez la liste depuis l’API ;
* mettez à jour le compteur d’inscriptions.

---

# Contraintes

L’utilisateur doit être identifié via la session PHP.

Le frontend ne doit jamais envoyer `user_id`.

Le serveur doit récupérer lui-même l’identifiant de l’utilisateur connecté depuis :

```
$_SESSION['user_id']
```

Toutes les requêtes SQL doivent utiliser PDO et des requêtes préparées.

Un utilisateur ne peut pas s’inscrire deux fois à la même course.

Un utilisateur ne peut pas supprimer l’inscription d’un autre utilisateur.

Les réponses de l’API doivent être au format JSON.

Les codes HTTP doivent être cohérents.

---

## Codes HTTP attendus


	200 OK
	Suppression réussie
	
	201 Created
	Inscription créée
	
	400 Bad Request
	Données invalides
	
	401 Unauthorized
	Utilisateur non connecté
	
	404 Not Found
	Course ou inscription inexistante
	
	409 Conflict
	Déjà inscrit ou course complète


---

## Bonus 1 — Statut d’inscription dans la liste des courses

Dans :

```
GET /api/races/
```

ajoutez une information permettant au frontend de savoir si l’utilisateur connecté est déjà inscrit.

Exemple :


	{
	    "id": 2,
	    "name": "Trail des Lacs",
	    "registered": 142,
	    "maxParticipants": 150,
	    "userRegistered": true
	}


Le bouton peut alors afficher :

```
Déjà inscrit
```

---

## Bonus 2 — Nombre réel de participants

Modifiez :

```
GET /api/races/
```

afin que :

```
registered
```

corresponde au nombre réel de lignes dans `registrations`.

---

## Bonus 3 — Compteur sur le profil

Mettez automatiquement à jour :

```
<span id="registration-count"></span>
```

Exemples :


	0 inscription
	1 inscription
	3 inscriptions


---

## Bonus 4 — Confirmation de désinscription

Avant d’appeler l’API de suppression, demandez confirmation à l’utilisateur.

Exemple :

```text
Voulez-vous vraiment vous désinscrire de cette course ?
```
