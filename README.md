This API provides basic CRUD-like functionality for managing items.  
Built with Node.js http module and a simple controller.

## Endpoints

### 1. Get all items
Request
GET /items

[
  {
    "id": 1,
    "name": "Apples",
    "purchased": false,
    "quantity": 10,
    "size": "Medium"
  },
  {
    "id": 2,
    "name": "Bananas",
    "purchased": true,
    "quantity": 6,
    "size": "Small"
  }
]

2. Get item by ID
Request


GET /items/:id

id (number) – The ID of the item.

Responses

200 OK

{
  "id": 1,
  "name": "Apples",
  "purchased": false,
  "quantity": 10,
  "size": "Medium"
}
400 Bad Request


{ "error": "Invalid ID" }
404 Not Found

{ "error": "Item not found" }
3. Create a new item
Request


POST /items
Content-Type: application/json
Body

{
  "name": "Oranges",
  "purchased": false,
  "quantity": 12,
  "size": "Large"
}
Responses

201 Created

{
  "id": 3,
  "name": "Oranges",
  "purchased": false,
  "quantity": 12,
  "size": "Large"
}
400 Bad Request

{
  "errors": [
    "Name is required",
    "Purchased must be a boolean",
    "Quantity must be a number",
    "Size is required"
  ]
}
400 Invalid JSON

{ "error": "Invalid JSON" }
4. Invalid Method
If a method is used that isn’t supported:

Response (405 Method Not Allowed)

{ "error": "Method Not Allowed on /items" }
5. Invalid Route
If the route doesn’t exist:

Response (404 Not Found)

{ "error": "Route Not Found" }
