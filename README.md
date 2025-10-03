# CRUD API de Tareas

CRUD API de Tareas construida con **Node.js**, **TypeScript** y **Express**.  
Esta API permite crear, leer, actualizar y eliminar tareas (To-Do), y está documentada con **Swagger** para facilitar su uso y pruebas.

---

## 📦 Tecnologías

- Node.js
- TypeScript
- Express
- Swagger (OpenAPI)
- Git/GitHub
- ts-node-dev (para desarrollo)
- Middleware: CORS, Morgan
- Validaciones y manejo de errores básico

---

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/crud-api-tasks.git
cd crud-api-tasks
Instala las dependencias:

bash
Copiar código
npm install
Corre el proyecto en modo desarrollo:

bash
Copiar código
npm run dev
El servidor correrá en http://localhost:4000



📄 Documentación de la API (Swagger)
Swagger UI está disponible en:

bash
Copiar código
http://localhost:4000/api-docs
Ahí puedes ver todos los endpoints, parámetros, request body y responses.
También puedes probar la API directamente desde la interfaz de Swagger.

🔗 Endpo

ints
Método	Ruta	Descripción
GET	/tasks	Obtener todas las tareas
GET	/tasks/:id	Obtener una tarea por ID
POST	/tasks	Crear una nueva tarea
PUT	/tasks/:id	Actualizar una tarea
DELETE	/tasks/:id	Eliminar una tarea



🧩 Estructura del proyecto
bash
Copiar código
01-crud-api/
 ├─ src/
 │   ├─ controllers/      # Lógica de controladores
 │   ├─ routes/           # Definición de rutas
 │   ├─ services/         # Lógica de negocio y manejo de datos
 │   ├─ models/           # Tipos y modelos de datos
 │   ├─ middlewares/      # Middleware y manejo de errores
 │   ├─ app.ts            # Configuración de Express y Swagger
 │   └─ server.ts         # Inicio del servidor
 ├─ package.json
 ├─ tsconfig.json
 ├─ .gitignore
 └─ README.md
✅ Features
CRUD completo de tareas

Validaciones básicas (título requerido)

Manejo de errores centralizado

Documentación interactiva con Swagger

Proyecto listo para GitHub y portfolio



⚡ Próximos pasos / Mejoras

Integración con base de datos (PostgreSQL)

Autenticación JWT

Tests unitarios y de integración

Dockerización del proyecto

CI/CD con GitHub Actions



👨‍💻 Autor

Tu Nombre

GitHub

Correo (opcional)