# Documentation

## Endpoint routes

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /messages | Creating destination and message |



## Error Routes

If there are no keys --> Error (405) with message 'The keys can't be empty. The necessary keys are destination and message'

---

If 'destination' key doesn't exist --> Error (406) with message 'The key destination must exist. The necessary keys are destination and message'

---

If 'message' key doesn't exist --> Error (407) with message 'The key message must exist. The necessary keys are destination and message'

[POSTMAN TESTS](Tests-Exercise02.postman_collection.json)
<!-- | .env  | 
| PORT  | 
| MONDODB_URI  |  -->