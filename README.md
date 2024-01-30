<p align="center">
  <img alt="Logo" src="./public/logo.svg" width="150" height="150"/>
</p>
<div align="center">
  <h1>Discordia</h1>
</div>

<p align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript&logoColor=blue"/>

  <img alt="Next" src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>

  <img alt="React" src="https://img.shields.io/badge/react-black.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>

  <img alt="Tailwind" src="https://img.shields.io/badge/tailwindcss-black.svg?style=for-the-badge&logo=tailwind-css&logoColor=%2361DAFB"/>

  <img alt="Tailwind" src="https://img.shields.io/badge/prisma-black.svg?style=for-the-badge&logo=prisma&logoColor=white"/>

  <img alt="Postgres" src="https://img.shields.io/badge/Postgresql-black.svg?style=for-the-badge&logo=postgresql&logoColor=lightblue"/>
</p>

# About 🔎
<img alt="Cover" src="./public/cover.png"/>

Communication app where is possible to create personal servers or enter others servers by invite, also manage members and channels, send private messages to other members or just chat in server channels just like the real Discord.


# How to run 🏃
## Prerequisites
* npm
  ```sh
  npm install npm@latest -g

  ```
* [Uploadthing](https://uploadthing.com) and [Clerk](https://clerk.com) accounts

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/m1guelsb/discordia.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get the free api keys from [Uploadthing](https://uploadthing.com) and [Clerk](https://clerk.com)

4. Rename the `.env.example` to `.env` and fill the variables with the matching api keys

5. Populate your database with Prisma schemas:
  ```sh
   npx prisma migrate
   ```
6. Run the development server:
  ```sh
   npm run dev
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

Miguel Barbosa - [@m1guelsb](https://twitter.com/m1guelsb) - email@example.com

Project Link: [https://github.com/m1guelsb/discordia](https://github.com/m1guelsb/discordia)
