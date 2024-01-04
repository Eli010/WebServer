



# Dev

1. clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d```

# Install
npm install prisma --save-dev
npx prisma init --datasource-provider postgreSQL

una vez creado nuestro modelos realizamos la migración
npx prisma migrate dev --name init