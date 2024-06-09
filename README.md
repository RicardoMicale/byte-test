# byte-test

## Para correr localmente:

Hacer `bash $ npm install` en las carpetas backend y frontend por separado

Agregar las variables de entorno:

Para backend:

- Crear archivo backend/variables.env
- Agregar variables: (DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD)

Para frontend:

- Crear archivo frontend/.env.local
- Agregar variable NEXT_PUBLIC_API_URL

# Backend (Nestjs y Postgres)

```bash
# watch mode
$ npm run start:dev
```

# Frontend (Nextjs)

```bash
# run development server
$ npm run dev
```
