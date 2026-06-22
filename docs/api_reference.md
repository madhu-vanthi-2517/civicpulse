# API Reference

Base URL (local): `http://127.0.0.1:8000`
Base URL (ngrok testing): see team channel for current session URL

## Auth

### POST /auth/register
Registers a new citizen account. Role defaults to `citizen`.

Request:
```json
{ "name": "string", "email": "string", "password": "string" }
```

Response:
```json
{ "message": "Registered successfully", "email": "string" }
```

### POST /auth/login
Authenticates a user and returns a JWT access token.

Request:
```json
{ "email": "string", "password": "string" }
```

Response:
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "role": "citizen | authority",
  "email": "string"
}
```

---

## Complaints

### POST /api/complaint
Submits a new complaint. AI auto-classifies category, urgency, and department. Also checks for duplicate complaints in the same district.

Request:
```json
{
  "title": "string",
  "description": "string",
  "district": "Puducherry | Karaikal | Mahe | Yanam",
  "area": "string"
}
```

Response:
```json
{
  "message": "Complaint submitted successfully",
  "id": 1,
  "category": "string",
  "urgency": "High | Medium | Low",
  "department": "string",
  "status": "Pending",
  "duplicate_warning": false,
  "similar_to_id": null
}
```

### GET /api/complaints
Returns all complaints. Requires authentication.

Optional query params: `status`, `district`, `department`

### GET /api/complaints/public
Returns all complaints. No authentication required.

Optional query param: `district`

### GET /api/complaint/{id}
Returns a single complaint by ID.

### PUT /api/complaint/{id}/status
Updates a complaint's status. Requires authentication.

Request:
```json
{ "status": "Pending | In Progress | Resolved", "remarks": "string" }
```

---

## AI

### POST /ai/classify
Runs the classifier directly without saving a complaint. Used internally and for testing.

Request:
```json
{ "text": "string" }
```

Response:
```json
{
  "category": "string",
  "urgency": "High | Medium | Low",
  "department": "string"
}
```

---

## Analytics

### GET /api/analytics
Returns aggregate complaint statistics. Requires authentication.

Response:
```json
{
  "total": 0,
  "by_category": [{ "category": "string", "count": 0 }],
  "by_district": [{ "district": "string", "count": 0 }],
  "by_status": [{ "name": "string", "value": 0 }]
}
```