# TDD Review App - Product Reviews and Ratings System

## Project Description

This project is a practice application for **Test-Driven Development (TDD)** and **Behavior-Driven Development (BDD)**. It implements some features of product review and rating system, developed following testing best practices.

## Objective

The main purpose is to practice and master TDD/BDD techniques through building a REST API that handles:

- ✅ Product review creation and management
- ✅ Rating average calculations
- ✅ User data anonymization
- ✅ Content moderation
- ✅ Rate limiting and access control
- ✅ CRUD operations with simulated persistence

## Project Structure

```
src/
├── app.ts                    # Express configuration
├── index.ts                  # Entry point
├── controllers/              # HTTP controllers
│   └── reviewController.ts
├── data/                     # Persistence layer
│   └── reviewRepository.ts
├── domain/                   # Business logic
│   ├── anonymizer.ts        # User anonymization
│   ├── moderator.ts         # Content validation
│   ├── ratingCalculator.ts  # Average calculations
│   └── review.ts            # Review entity
├── middleware/              # Custom middleware
│   └── rateLimiter.ts      # Request rate control
├── routes/                  # Route definitions
│   └── reviewRoutes.ts
└── services/               # Application services
    └── reviewService.ts

tests/                      # Tests organized by layer
├── controllers/           # Integration tests (BDD)
├── domain/               # Unit tests (TDD)
├── middleware/          # Middleware tests
└── services/           # Service tests (TDD with mocking)
```

## Development Methodology

### Stage 1: Core Logic and Domain (Unit TDD) 🧪

**Components developed with pure TDD:**

- **A. Weighted Average Calculator** (`ratingCalculator.ts`)

  - Function: `calcularPromedio(ratings: number[]): number`
  - Precise calculation with rounding to one decimal place

- **B. Name Anonymizer** (`anonymizer.ts`)

  - Function: `anonimizarNombre(nombre: string): string`
  - Converts names/emails to anonymized format
  - Examples: "Carlos P." or "ca\*\*\*@gmail.com"

- **C. Content Validator** (`moderator.ts`)
  - Function: `validarContenido(texto: string): boolean`
  - Automatic moderation of prohibited content
  - Case-insensitive

### Stage 2: Persistence and Service Layer (TDD with Mocking) 💾

**Components with mocking and isolation:**

- **D. Review Repository** (`reviewRepository.ts`)

  - In-memory implementation
  - Methods: `guardar()`, `obtenerPorProducto()`

- **E. Review Service - Creation** (`reviewService.ts`)

  - Method: `crearReseña(data)`
  - Integration with moderator and validations

- **F. Review Service - Retrieval** (`reviewService.ts`)
  - Method: `obtenerReseñasPorProducto(productId)`
  - Average calculation and anonymization

### Stage 3: API and Integration Layer (BDD with Supertest) 🌐

**Endpoints and middleware with integration tests:**

- **G. POST /api/reviews** - Review creation

  - Status: 201 Created / 400 Bad Request
  - Rating range validation

- **H. GET /api/products/:id/reviews** - Review retrieval

  - Response with anonymized data
  - Average calculation included

- **I. DELETE /api/reviews/:id** - Moderation

  - Authorization middleware (MODERATOR role)
  - Status: 403 Forbidden for unauthorized users

- **J. Rate Limiting Middleware** (`rateLimiter.ts`)
  - Limit: 3 requests per minute
  - Status: 429 Too Many Requests

## Technologies Used

- **Node.js** + **TypeScript** - Runtime and static typing
- **Express.js** - Web framework
- **Jest** - Testing framework
- **Supertest** - API testing
- **TSyringe** - Dependency injection
- **ts-node** - Direct TypeScript execution

## Installation and Usage

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tdd_review_app

# Install dependencies
npm install
```

### Available Scripts

```bash
# Run all tests
npm test

# Compile TypeScript
npm run build

# Run in development mode
npm run dev

# Run in production
npm start
```

## API Endpoints

### Create Review

```http
POST /api/reviews
Content-Type: application/json

{
  "productId": "product-123",
  "userId": "user@email.com",
  "rating": 4,
  "comment": "Excellent product"
}
```

### Get Product Reviews

```http
GET /api/products/product-123/reviews
```

### Delete Review

```http
DELETE /api/reviews/review-id
Authorization: Bearer <moderator-token>
```

## Educational Benefits

This project demonstrates:

1. **Classic TDD** - Red/Green/Refactor in pure functions
2. **Effective Mocking** - External dependency isolation
3. **BDD with APIs** - End-to-end behavior testing
4. **Clean Architecture** - Clear separation of concerns
5. **Testing Pyramid** - Balance between unit and integration tests

## Implemented Patterns

- **Repository Pattern** - Persistence abstraction
- **Service Layer** - Application logic
- **Dependency Injection** - Dependency inversion
- **Middleware Pattern** - Request interceptors
- **Clean Architecture** - Framework independence
