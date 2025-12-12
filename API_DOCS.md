# Multivendor Backend — API Documentation

Base URL: `http://localhost:5000/api` (set your own)

## Auth
### POST /auth/register
Body: `{ name, email, password }`
### POST /auth/login
Body: `{ email, password }`

## Vendors
### GET /vendors
List vendors
### POST /vendors
Body: `{ name, description? }`

## Categories
### GET /categories
### POST /categories
Body: `{ name }`

## Subcategories
### GET /subcategories
### POST /subcategories
Body: `{ name, category }`

## Products
### GET /products
### POST /products
Body: `{ name, price, vendor, category, subcategory?, description? }`

