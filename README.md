# Documentation

## Endpoint routes

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /messages | Creating destination and message |



## Error Routes
---
Didn't find any other status code more specific than 400.

- If there are no keys --> Error (400) with message 'The keys can't be empty. The necessary keys are destination and message'

- If 'destination' key doesn't exist --> Error (400) with message 'The key destination must exist. The necessary keys are destination and message'

- If 'message' key doesn't exist --> Error (400) with message 'The key message must exist. The necessary keys are destination and message'


## Bussiness decisions
---

First I test if there is any error before sending it, and if there are any I show what kind of error with a short explanation. In case it didn't work, I catch the error after is send, and show what kind of error with a short explanation.


[POSTMAN TESTS](Tests-Exercise02.postman_collection.json)
<!-- | .env  | 
| PORT  | 
| MONDODB_URI  |  -->