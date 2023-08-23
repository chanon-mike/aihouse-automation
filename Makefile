# Run the application
.PHONY: backend
backend:
	@echo "Building backend..."
	@cd backend && make run

.PHONY: frontend
frontend:
	@echo "Building frontend..."
	@cd frontend && npm run dev

.PHONY: run
run:
	@echo "Starting application..."
	@make backend & make frontend

# Tests 
.PHONY: test-frontend
test-frontend:
	@echo "Running frontend tests..."
	@cd frontend && npm run test

.PHONY: test-backend
test-backend:
	@echo "Running backend tests..."
	@cd backend && make unittest

.PHONY: test
test:
	@echo "Running tests..."
	@make test-backend & make test-frontend

# Linting
.PHONY: lint-frontend
lint-frontend:
	@echo "Linting frontend..."
	@cd frontend && npm run lint

.PHONY: lint-backend
lint-backend:
	@echo "Linting backend..."
	@cd backend && make lint

.PHONY: lint
lint:
	@echo "Linting..."
	@make lint-backend & make lint-frontend

# Formatting
.PHONY: format-frontend
format-frontend:
	@echo "Formatting frontend..."
	@cd frontend && npm run lint:fix

.PHONY: format-backend
format-backend:
	@echo "Formatting backend..."
	@cd backend && make format

.PHONY: format
format:
	@echo "Formatting..."
	@make format-backend & make format-frontend