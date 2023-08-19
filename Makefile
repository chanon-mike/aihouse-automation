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