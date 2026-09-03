# Exo 07 — Une course par ID
    GET /api/races/2

## Bonus

Ajoutez un second endpoint :

```
GET /api/races/2
```

permettant de récupérer uniquement la course dont l'identifiant vaut `2`.

Si la course n'existe pas, retournez :

```
404 Not Found
```

avec :

```
{
  "error": "Race not found"
}
```