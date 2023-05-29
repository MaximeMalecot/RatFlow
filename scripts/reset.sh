docker compose down -v; \
cp ./front/.env.example ./front/.env; \
cp ./server/.env.example ./server/.env; \
docker compose up --build -d; \
sleep 10; \
docker compose exec server npm run seed;