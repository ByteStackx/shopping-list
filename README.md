# Items API

This API provides basic CRUD-like functionality for managing items.  
Built with Node.js `http` module and a simple controller.

---

## Endpoints

### 1. Get all items

**Request**  
GET /items

**Response 200 OK**
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

---

### 2. Get item by ID

**Request**  
GET /items/:id

- id (number) – The ID of the item.

**Responses**

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

---

### 3. Create a new item

**Request**  
POST /items  
Content-Type: application/json

**Body**
{
  "name": "Oranges",
  "purchased": false,
  "quantity": 12,
  "size": "Large"
}

**Responses**

201 Created
{
  "id": 3,
  "name": "Oranges",
  "purchased": false,
  "quantity": 12,
  "size": "Large"
}

400 Bad Request (validation errors)
{ "error": "Name is required, Purchased must be a boolean, Quantity must be a number, Size is required" }

400 Bad Request (invalid JSON)
{ "error": "Invalid JSON" }

---

### 4. Update an item

**Request**  
PUT /items/:id  
Content-Type: application/json

**Body (any subset of fields)**
{
  "purchased": true,
  "quantity": 15
}

**Responses**

200 OK
{
  "id": 1,
  "name": "Apples",
  "purchased": true,
  "quantity": 15,
  "size": "Medium"
}

400 Bad Request
{ "error": "Purchased must be a boolean, Quantity must be a number" }

400 Bad Request (invalid JSON)
{ "error": "Invalid JSON" }

404 Not Found
{ "error": "Item not found" }

---

### 5. Delete an item

**Request**  
DELETE /items/:id

**Responses**

204 No Content  
(empty response body)

400 Bad Request
{ "error": "Invalid ID" }

404 Not Found
{ "error": "Item not found" }

---

### 6. Invalid Method

If a method is used that isn’t supported:

405 Method Not Allowed
{ "error": "Method Not Allowed on /items" }

---

### 7. Invalid Route

If the route doesn’t exist:

404 Not Found
{ "error": "Route Not Found" }
