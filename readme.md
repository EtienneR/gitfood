# GitFood

GitFood est un projet scolaire de fin d'année.  
C'est une application en béta.

## Installation

### Pré-requis

- NodeJS + NPM ;
- Docker + Docker Compose.

### Procédure

Placez-vous dans le répertoire de l'application puis lancez la commande `$ docker-compose up`.  
Cela aura pour conséquence de créer 3 containers :

- Adminer (PHP)
- Postgres
- API (ExpressJS)
- Front (VueJS)

### Migration et seed (1ère installation)

Dans le répertoire "api", lancez les 2 commandes suivantes `node_modules/.bin/knex migrate:latest` et `node_modules/.bin/knex seed:run`.

A ce stade, le back end fonctionne et est disponible sur http://127.0.0.1:3000

## Récapitulatif

| Nom | Port |
| --- | ---- |
| Postgres | 5432 |
| API | 3000 |
| Front | 8081 |

## Todolist des features

Liste non exhaustive...

| Tâche | Scope | Status | Commentaire |
| ----- | ----- | ------ | ----------- |
| Création docker-compose.yml | Devops | Fini | Pas de Knex |
| Migration avec Knex | API | En cours | Seulement les recettes |
| Seed avec Knex | API | En cours | Seulement les recettes |
| Formulaire ajout recette | Front | Fini | |
| Formulaire modification recette | Front | Fini | |
| Migration sur Buefy | Front | Fini | |
| Moteur de recherche | API & Front | Backlog | |
| Authentification | Api & Front | Backlog | |
| Formater date | Front | Backlog | |
| Moteur de recherche par titre dans compte | Front | Backlog | |
| FormWizard | Front | Backlog | |
| Github | Devops | Backlog | Pousser sur Github |
| Helmet (Express) | API | Backlog | Ajout de sécurité |
| Organisation MVC | API | Fini | Création modèle |
| Ajout EventBus | Front | Fini | Pour les notifications / toast |
| Ajout dialogue suppression recette | Front | Backlog | Ajout dialog |

## Sources

- https://hub.docker.com/_/postgres