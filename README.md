<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

````bash
README.md – Proyecto Tecno Total
===============================

1. Título y Descripción
------------------------
Nombre del proyecto: Tecno Total

Descripción breve:
Tecno Total es un sistema de gestión de reparaciones de equipos. Permite registrar a los clientes y los dispositivos que han dejado para reparación. 
A medida que el estado de la reparación avanza, el sistema notifica automáticamente al cliente por correo electrónico sobre los cambios.

Tecnologías utilizadas:
- Backend: NestJS
- Frontend: NextJS
- Base de datos: PostgreSQL

2. Requisitos Previos
----------------------
Asegúrate de tener instalados:
- Node.js v18+
- PostgreSQL v15+
- Yarn o npm
- Docker (opcional)

3. Instalación y Configuración
-------------------------------
Clona los repositorios:

Frontend:
git clone https://github.com/Wendell-Jarquin/TecnoTotalFrontend.git
cd TecnoTotalFrontend

Backend:
git clone https://github.com/Wendell-Jarquin/TecnoTotalBackend.git
cd TecnoTotalBackend

Instala las dependencias:
npm install  ó  yarn install

Configura las variables de entorno (.env):

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root
DB_NAME=tecnot

JWT_SECRET=tu_clave_secreta
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password

4. Ejecución del Proyecto
--------------------------
Frontend (NextJS):
npm run dev

Backend (NestJS):
npm run start:dev

5. Uso del Sistema
-------------------
Endpoints clave (desde el backend):
- POST /auth/login         – Autenticación de usuarios
- POST /clientes           – Registro de clientes
- POST /equipos            – Registro de equipos en reparación
- PATCH /reparaciones/:id  – Cambiar estado de reparación

Documentación Swagger:
http://localhost:3000/api


6. Estructura de Carpetas
--------------------------
TecnoTotalFrontend/
  ├── pages/
  ├── components/
  ├── styles/
  └── public/

TecnoTotalBackend/
  ├── src/
      ├── auth/
      ├── clientes/
      ├── equipos/
      ├── reparaciones/
      ├── mailer/
      └── main.ts

7. Características Destacadas
------------------------------
- Sistema modular con NestJS
- Interfaz moderna con NextJS y TailwindCSS
- Gestión y seguimiento de reparaciones en tiempo real
- Notificaciones automáticas por correo electrónico al cliente
- Seguridad con JWT y validación de usuarios

8. Posibles Mejoras Futuras
----------------------------
- Integración con WhatsApp API
- Dashboard de estadísticas
- Subida de imágenes de los equipos reparados
- Histórico de reparaciones por cliente

9. Licencia
-----------
Este proyecto es privado y no posee una licencia específica. Su uso está limitado al propietario.

10. Autor
---------
Desarrollado por Wendell Jarquín (github.com/Wendell-Jarquin)

11. Información detallada del Frontend
------------------------------------------
El frontend de Tecno Total está construido con **Next.js 14**, **React 18** y **TailwindCSS**, siguiendo una arquitectura modular moderna y escalable.

Configuración del `package.json`:
{
  "name": "tecnototal-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",

    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-slot": "^1.2.2",
    "chart.js": "^4.4.9",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.510.0",
    "next": "14.2.28",
    "react": "^18",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^18",
    "react-hook-form": "^7.56.4",
    "react-icons": "^5.5.0",
    "tailwind-merge": "^3.3.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.28",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

Componentes clave en el frontend:

- Formularios validados con `react-hook-form`
- Visualización de datos con `react-chartjs-2`
- Estilos modernos con `TailwindCSS` y `clsx`
- Íconos con `lucide-react` y `react-icons`
- Animaciones ligeras (`tailwindcss-animate`)
- Accesibilidad con Radix UI

Diseño enfocado en:
- Facilidad de uso
- Interfaz responsiva y accesible
- Interacción fluida con el backend mediante API REST
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
