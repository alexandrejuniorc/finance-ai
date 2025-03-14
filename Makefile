.PHONY: default run build test clean

STRIPE_URL_WEBHOOKS=http://localhost:3000/api/webhooks/stripe

## Docker
docker/dev/start:
	@echo "Starting development environment..."
	@docker compose up -d

docker/dev/stop:
	@echo "Stopping development environment..."
	@docker compose down

docker/dev/clean:
	@echo "Cleaning development environment..."
	@docker compose down -v --remove-orphans --rmi all

## Prisma
prisma/dev/generate-migrations:
	@echo "Generating migrations..."
	@npx prisma migrate dev

## Environment
environment/dev/prepare:
	@echo "Preparing environment..."
	@npm install
	@make docker/dev/start
	@make generate-migrations

## Stripe
stripe/dev/login:
	@stripe login

stripe/dev/listen:
	@stripe listen --forward-to $(STRIPE_URL_WEBHOOKS)
