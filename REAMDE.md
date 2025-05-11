# CHILLFLIX API
cara buat jalanin semua environment aplikasi ini pake `docker-compose` soalnya biar gampang dan cepet up and running aplikasinya, step by step nya gini:
  1. copy `.env.example` jadi `.env`
  2. jalanin command `docker compose up --build`
  3. nah buka terminal baru abis itu cek `NAMES` saat execute command `docker ps -a`
  4. sekarang jalanin buat migration nya `docker exec <rest-api-nodejs-app-1> npx knex migrate:up`
  5. lalu jalanin command `docker exec rest-api-nodejs-app-1 npx knex seed:run` buat jalanin seeding data nya
  6. buat ngecek API nya bisa pake file `thunder-collection_chillflix.json` (berarti harus udah ada Thunder Client di VSCode nya) atau `thunder-collection_postman_chillflix.json` buat postman