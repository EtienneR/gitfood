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

### Tests Unitaires

Lancez le docker-compose.test.yml avec la commande `$ docker-compose -f docker-compose.test.yml up` et les tests dans le dossier api. 

- `npm run tests` : lance tous les fichiers de tests ;
- `npm run test -- file.test.js` : lance un fichier de test spécifique.

### Récapitulatif

| Nom | Port | Accès |
| --- | ---- | ----- |
| Postgres | 5432 | `$ docker-compose run db psql -h db -U root -d gitfood` |
| API | 3000 | |
| Front | 8080 | |
| Postgres test | 5433 | |
| API test | 3001 | |

## Todolist des features

Liste non exhaustive...

| Tâche | Scope | Status | Commentaire |
| ----- | ----- | ------ | ----------- |
| Création docker-compose.yml | Devops | Done | |
| Formulaire ajout recette | Front | Done | |
| Formulaire modification recette | Front | Done | |
| Migration sur Buefy | Front | Done | |
| Github | Devops | Done | Pousser sur Github |
| Organisation MVC | API | Done |  |
| Ajout EventBus | Front | Done | Pour les notifications / toast |
| Ajout page Erreur 404 | Front | Done |
| Ajout vue-meta | Front | Done | Remplacé par vue-headful |
| Formater date | Front | Done | Date formatée avec Moment |
| Fil d'Arianne | Front | Done |  |
| Moteur de recherche | API & Front | Done | |
| Ajout dialogue suppression recette | Front | Done | Ajout Dialog |
| Helmet (Express) | API | Done | Ajout de sécurité |
| Migration avec Knex | API | Done | |
| Seed avec Knex | API | Done | |
| FormWizard | Front | En cours | Provisoire (accessibilité) |
| Ajout image | Back & front | En cours | Pas de formulaire d'upload |
| Tests unitaires avec Jest | Back | En cours | docker-compose.test.yml et npm run test |
| Authentification | Api & Front | Backlog | |

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