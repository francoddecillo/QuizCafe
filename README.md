# Quiz Café ☕️ | Proyecto Full Stack Dockerizado

## Descripción

Quiz Café es un proyecto personal de aprendizaje sobre una aplicación web full stack donde los usuarios se registran, inician sesión y participan de un quiz interactivo sobre café. El sistema está dividido en tres microservicios (usuarios, preguntas y frontend) y usa autenticación JWT. Todo corre sobre Docker para facilitar el despliegue y garantizar compatibilidad en cualquier entorno.

## Estructura del proyecto

* **docker-compose.yml**
* **.env.example**
* **quiz-cafe-frontend/**

  * Dockerfile
  * index.html
  * quiz.html
  * register.html
  * css/

    * styles.css
    * quiz.css
    * register.css
  * js/

    * app.js
    * quiz.js
    * register.js
  * img/

    * fondo-cafe.jpg
    * cafe2.png
    * cafe3.png
    * cafe4.png
* **quiz-cafe-preguntas/**

  * Dockerfile
  * pom.xml
  * src/

    * main/

      * java/

        * com/

          * backend/

            * preguntas/

              * controller/

                * **PreguntaController.java**
              * entity/

                * **Pregunta.java**
              * repository/

                * **PreguntaRepository.java**
              * service/

                * **PreguntaService.java**
              * (otras clases de lógica del quiz)
      * resources/

        * application.properties
* **quiz-cafe-usuarios/**

  * Dockerfile
  * pom.xml
  * src/

    * main/

      * java/

        * com/

          * backend/

            * usuarios/

              * controller/

                * **UsuarioController.java**
              * entity/

                * **Usuario.java**
              * repository/

                * **UsuarioRepository.java**
              * service/

                * **UsuarioService.java**
              * dto/

                * **AuthResponse.java**
                * **LoginRequest.java**
                * **UsuarioRequest.java**
              * security/

                * **JwtAuthenticationFilter.java**
                * **JwtUtil.java**
                * **SecurityConfig.java**
      * resources/

        * application.properties

---

## Tecnologías utilizadas

* Java 17
* Spring Boot 3.5.4
* Spring Security + JWT
* Spring Data JPA
* MySQL
* Docker & Docker Compose
* Maven
* HTML, CSS, JavaScript (frontend)

## Microservicios

### quiz-cafe-usuarios (Autenticación y usuarios)

* Registro y login de usuarios.
* Autenticación JWT (token).
* Passwords encriptadas con BCrypt.
* Endpoints públicos: `/api/usuarios/login`, `/api/usuarios/register`.

### quiz-cafe-preguntas (Preguntas del quiz)

* Gestión CRUD de preguntas.
* Endpoints protegidos por JWT.

### quiz-cafe-frontend

* App web que consume ambos microservicios.

## Endpoints principales

### Usuarios (`quiz-cafe-usuarios`)

#### Registro

`POST /api/usuarios/register`

**Request:**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@email.com",
  "password": "miclave123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "nombre": "Juan"
}
```

#### Login

`POST /api/usuarios/login`

**Request:**

```json
{
  "email": "juan.perez@email.com",
  "password": "miclave123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "nombre": "Juan"
}
```

**Uso del JWT:**
Incluí el token en las requests a los servicios protegidos usando este header:

```
Authorization: Bearer <tu_jwt_aquí>
```

---

### Preguntas (`quiz-cafe-preguntas`)

Todos los endpoints requieren autenticación JWT.

* `GET /api/preguntas`: Lista todas las preguntas.
* `GET /api/preguntas/{id}`: Pregunta por ID.
* `GET /api/preguntas/nivel/{nivel}`: Preguntas por nivel.
* `POST /api/preguntas`: Crear una nueva pregunta.
* `POST /api/preguntas/bulk`: Crear preguntas en lote.
* `PUT /api/preguntas/{id}`: Actualizar una pregunta.
* `DELETE /api/preguntas/{id}`: Eliminar pregunta.

---

## Base de datos

* Se usa MySQL (cada microservicio se conecta a la DB según su configuración).
* Los datos de conexión y los secretos JWT se configuran en `.env` y/o `application.properties`.

## Variables de entorno (ejemplo)

En tu `.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=quizcafe
DB_USER=tu_usuario
DB_PASSWORD=tu_password

jwt.secret=tu_secreto_super_seguro
jwt.expiration=3600000
```

## Requisitos previos

* Docker
* Docker Compose

## Cómo levantar el proyecto

1. Configurá el archivo `.env` con tus datos (DB y JWT).
2. Desde la raíz del proyecto, corré:

```bash
docker-compose up --build
```

3. Accedé a:

  * Frontend: `http://localhost:<PUERTO_FRONTEND>`
  * Usuarios (API): `http://localhost:<PUERTO_USUARIOS>`
  * Preguntas (API): `http://localhost:<PUERTO_PREGUNTAS>`

> Revisá los puertos en `.env` y en `docker-compose.yml`.

## Seguridad

* Contraseñas hasheadas con BCrypt.
* JWT firmado con HS256.
* Los endpoints `/api/usuarios/login` y `/api/usuarios/register` son públicos, el resto requiere token.

