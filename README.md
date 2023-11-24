# INF3710
Application vierge pour le TP4 du cours d'[INF3710 Fichiers et bases de données ](https://www.polymtl.ca/programmes/cours/fichiers-et-bases-de-donnees) à Polytechnique Montréal.

## Important

Les commandes débutant par `npm` ou `yarn` doivent être exécutées dans le dossier `client` ou le dossier `server`.

## Installation des dépendances

-   Installer `npm`
-   Exécuter `npm -v` et `node -v` dans une fenêtre de commande pour s'assurer de bien voir les versions, ce qui confirme l'installation.
-   Exécuter `npm install` dans le dossier `client` et le dossier `server`.

## Démarrer l’application

Exécuter : `npm start` dans le dossier `client` et le dossier `server`.

Client:
Une page web: `http://localhost:4200/` devrait s'ouvrir automatiquement.

Serveur:
Écoute sur le port 3000 du client local (localhost) AKA 127.0.0.1 : `http://localhost:3000`.

## Générer de nouveau module (Client Side)

En utilisant les commandes Angular CLI: 
	`ng g c component-name` pour un nouveau composant.
	`ng g s service-name` pour un nouveau service.

Vous pouvez aussi utiliser `ng g directive|pipe|service|class|guard|interface|enum|module nameOfWhatYouWant` pour d'autres modules de votre projet.

## Tests Unitaires

-   Exécuter `npm run test`.

-   Exécuter `npm run coverage` pour générer un rapport de couverture.

## TSLint

-   Execute `npm run lint`.

-   Execute `npm run lint -- --fix` or `yarn lint --fix` to automatically resolve certain lint errors.

# Glossaire
| Mot | Definition  |
|---|---|
| NPM | Node Package Manager  |
| NVM | Node Version Manager  |
| CLI | Command Line Interface  |