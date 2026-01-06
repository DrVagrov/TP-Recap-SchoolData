# Documentation API

## Instructions pour lancer le projet

1. Installer les dépendances si elles manquent :  
```bash
npm install
```

2. Lancer le seeder pour remplir la base de données :  
```bash
node seed/seed.js
```

3. Démarrer le projet :  
```bash
npm run start
```

4. Accéder à la documentation Swagger :  
[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

---

## Liste des routes API

> Les routes 🔒 nécessitent un token **Bearer** pour l’authentification.

### 🔹 Auth
| Méthode | Route           | Description                                  |
|---------|----------------|----------------------------------------------|
| POST    | /auth/register | Inscription d’un nouvel utilisateur         |
| POST    | /auth/login    | Connexion et génération d’un token JWT      |

### 🔹 Categories
| Méthode | Route             | Description                             |
|---------|-----------------|-----------------------------------------|
| GET     | /categories      | Récupérer toutes les catégories         |
| GET     | /categories/{id} | Récupérer une catégorie par ID          |
| 🔒POST  | /categories      | Ajouter une nouvelle catégorie (protégé)|

### 🔹 Courses
| Méthode | Route                     | Description                                      |
|---------|---------------------------|--------------------------------------------------|
| GET     | /courses                  | Récupère tous les cours publiés                 |
| GET     | /courses/{id}             | Récupère un cours par son identifiant          |
| GET     | /courses/level/{level}    | Récupère tous les cours d’un niveau spécifique |
| 🔒POST  | /courses                  | Crée un nouveau cours (protégé)                |
| 🔒PUT   | /courses/{id}             | Met à jour un cours existant (protégé)        |
| 🔒DELETE| /courses/{id}             | Supprime un cours (protégé)                    |

