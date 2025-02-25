### Docker setup
docker/dev/start:
	@echo "Starting development environment..."
	@docker compose up -d
docker/dev/stop:
	@echo "Stopping development environment..."
	@docker compose down
docker/dev/clean:
	@echo "Cleaning development environment..."
	@docker compose down -v --remove-orphans --rmi all

### Prisma setup
generate-migrations:
	@echo "Generating migrations..."
	@npx prisma migrate dev

### Environment setup
prepare-environment:
	@echo "Preparing environment..."
	@npm install
	@make docker/dev/start
	@make generate-migrations