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
| Création docker-compose.yml | Devops | Fini | Pas de Knex |
| Migration avec Knex | API | En cours | Seulement les recettes et les utilisateurs|
| Seed avec Knex | API | En cours | Seulement les recettes et les utilisateurs |
| Formulaire ajout recette | Front | Fini | |
| Formulaire modification recette | Front | Fini | |
| Migration sur Buefy | Front | Fini | |
| Moteur de recherche | API & Front | Backlog | |
| Authentification | Api & Front | Backlog | |
| Formater date | Front | Backlog | |
| Moteur de recherche par titre dans compte | Front | Backlog | |
| FormWizard | Front | Backlog | |
| Github | Devops | Fini | Pousser sur Github |
| Helmet (Express) | API | Backlog | Ajout de sécurité |
| Organisation MVC | API | Fini | Création modèle |
| Ajout EventBus | Front | Fini | Pour les notifications / toast |
| Ajout dialogue suppression recette | Front | Backlog | Ajout dialog |

## Sources

- https://www.docker.com
- https://hub.docker.com/_/postgres
- https://hub.docker.com/_/node
- https://expressjs.com
- https://knexjs.org
- https://vuejs.org
- https://buefy.github.io
- https://bulma.io