cp ./front/.env.example ./front/.env; \
cp ./server/.env.example ./server/.env; \
docker compose up --build -d; \
docker compose exec server npm run seed;