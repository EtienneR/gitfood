# GitFood

GitFood est un projet scolaire de fin d'année.  
C'est une application en béta.

## Installation

### Pré-requis

- NodeJS + NPM  (`node -v && npm -v`);
- Docker + Docker Compose (`docker version && docker-compose version`).

### Procédure

Placez-vous dans le répertoire de l'application puis lancez la commande `$ docker-compose up`.  
Cela aura pour conséquence de créer 3 containers :

- Postgres
- API (ExpressJS)
- Front (VueJS)

### Récapitulatif

| Nom | Port | Accès |
| --- | ---- | ----- |
| Postgres | 5432 | `$ docker-compose run db psql -h db -U root -d gitfood` |
| API | 3000 | |
| Front | 8081 | |

## Todolist des features

Liste non exhaustive...

| Tâche | Scope | Status | Commentaire |
| ----- | ----- | ------ | ----------- |
| Création docker-compose.yml | Devops | Done | |
| Formulaire ajout recette | Front | Done | |
| Formulaire modification recette | Front | Done | |
| Migration sur Buefy | Front | Done | |
| Github | Devops | Done | Pousser sur Github |
| Organisation MVC | API | Done | Création modèle |
| Ajout EventBus | Front | Done | Pour les notifications / toast |
| Ajout page Erreur 404 | Front | Done |
| Ajout vue-meta | Front | Done | Seulement la balise title |
| Formater date | Front | Done | Date formatée avec Moment |
| Migration avec Knex | API | En cours | Seulement les recettes et les utilisateurs |
| Seed avec Knex | API | En cours | Seulement les recettes et les utilisateurs |
| Moteur de recherche | API & Front | Backlog | |
| Authentification | Api & Front | Backlog | |
| Moteur de recherche par titre dans compte | Front | Backlog | |
| FormWizard | Front | Backlog | |
| Helmet (Express) | API | Backlog | Ajout de sécurité |
| Ajout dialogue suppression recette | Front | Backlog | Ajout dialog |
| Tests unitaires avec Jest | Back | En cours | Soucis avec les promesses |

## Sources

- https://www.docker.com
- https://hub.docker.com/_/postgres
- https://hub.docker.com/_/node
- https://expressjs.com
- https://knexjs.org
- https://vuejs.org
- https://buefy.github.io
- https://bulma.io
- https://github.com/declandewet/vue-meta
- https://momentjs.com
- https://github.com/punkave/sanitize-html