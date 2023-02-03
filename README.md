# Base NextJs 13 + TypeScript + Backend + PostgreSQL

Base Application

# Next.js Base - App

Para correr localmente, se necesita la base de datos.

```
docker-compose up -d
```

- El -d, significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- DATABASE_URL

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

- Reconstruir los módulos de node

```
yarn install
yarn dev
```
