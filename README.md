# Cabify MessageApp

It is a basic message delivery system, that uses an external service called messageapp. The project is an API that interacts with the external service.

---

## Deployement

Once you download it, go to the projects file and run:

(In case you need to install Docker on your desktop go to ==> [link](https://www.docker.com/get-started/))

```bash
$ docker-compose build
$ docker-compose up
```

## API Reference
---
### **Send Message**

```http
  POST /messages
```

| Parameter || Description                       |
| :-------- | :------- | :-------------------------------- |
| `destination`      || destination of the message |
| `body`      || message content |


### **Send credit**

```http
  POST /credit
```

| Parameter || Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      || credit amount |



### **Get all messages**

```http
  GET /messages
```

| Parameter || Description                |
| :-------- | :------- | :------------------------- |
| `status` || A JSON with all the messages |


### **Get status of message**

```http
  GET /message/:id/status
```

| Parameter || Description                |
| :-------- | :------- | :------------------------- |
| `messageId` || message ID |
| `status` || 200 OK |


### **Get metrics**

```http
  GET /metrics
```

| Parameter || Description                |
| :-------- | :------- | :------------------------- |
| `number` || number of times the endpoint is used |
| `status` || 200 OK |



### **Errors**

| Error | Code     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bad Request`      | `400` | destination key is not provided or is null |
| `Bad Request`      | `400` | body key is not provided or is null |
| `Bad Request`      | `400` | body and destinations keys must be strings |
| `Server Error`      | `500` | server failed, message unsuccessfully saved |

## POSTMAN
---

[POSTMAN Tests Collection](Tests.postman_collection.json)