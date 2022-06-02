# Documentation

## Endpoint routes

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /messages | Creating destination and message |
| GET | /messages | Get the information saved in the DB |




## Error Routes
---
Didn't find any other status code more specific than 400.

- If there are no keys --> Error (400) with message 'The keys can't be empty. The necessary keys are destination and message'

- If 'destination' key doesn't exist --> Error (400) with message 'The key destination must exist. The necessary keys are destination and message'

- If 'message' key doesn't exist --> Error (400) with message 'The key message must exist. The necessary keys are destination and message'


## Bussiness decisions
---

First I test if there is any error before sending it, and if there are any I show what kind of error with a short explanation.

I send the information to the API, and then I check if is the correct status, if it's correct, I create a new Message.

In the catch, I send the appropriate message, that explains that the message wasn't sended, and record it.

The 504 status error is the one that occurs when there is a timeout, so in case there is one I send the appropriate message.



[POSTMAN TESTS](Tests-Exercise02.postman_collection.json)
<!-- | .env  | 
| PORT  | 
| MONDODB_URI  |  -->