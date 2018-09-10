# API RESTful

## Routes

Toutes les routes sont préfixées avec `/api/v1`.

### Users

| Type | Endpoint | Description |
| ---- | -------- | ----------- |
| GET | /users/:id | Affiche les données de l'utilisateur |
| POST | /users | Insère un utilisateur |
| DELETE | /users/:id | Supprime l'utilisateur |

### Recipes

| Type | Endpoint | Description |
| ---- | -------- | ----------- |
| GET | /recipes | Affiche toutes les recettes |
| GET | /recipes?q= | Recherche de recettes |
| GET | /recipes/:id | Affiche les données de la recette |
| GET | /recipes/user/:user_id | Affiche les recettes liées à cet utilisateur |
| GET | /recipes/user/:user_id/others/:id | Affiche les recettes liées à cet utilisateur en excluant la recette |
| GET | /recipes/forks/:user_id | Affiche les recettes forkées |
| POST | /recipes | Insère une recette |
| PUT | /recipes/:id | Modifie la recette |
| DELETE | /recipes/:id | Supprime la recette |

### Comments

| Type | Endpoint | Description |
| ---- | -------- | ----------- |
| GET | /comments | Affiche tous les commentaires |
| GET | /comments/:id | Affiche le commentaire |
| GET | /comments/recipe/recipe_id | Affiche les commentaires liés à une recette |
| GET | /comments/user/user_id | Affiche les commentaires liés à un utilisateur |
| POST | /comments | Insère un commentaire |
| DELETE | /comments/:id | Supprime le commentaire |

### Likes

| Type | Endpoint | Description |
| ---- | -------- | ----------- |
| GET | /likes | Affiche tous les likes |
| GET | /likes/:id | Affiche le like |
| GET | /likes/user/:id | Affiche les likes de l'utilisateur |
| POST | /likes | Insère un like |
| DELETE | /likes/:id | Supprime le like |