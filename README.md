# Cabify MessageApp

## Deployement

Once you download it, go to the projects file and run:

(In case you need to install Docker on your desktop go to ==> [link](https://www.docker.com/get-started/) )

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `destination`      | `string` | destination of the message |
| `message`      | `string` | message content |


### **Send credit**

```http
  POST /credit
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount`      | `number` | credit amount |



### **Get all messages**

```http
  GET /messages
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `destination` | `string` | destination of the messages |
| `message` | `string` | message content |
| `status` | `enum` | A JSON with all the messages |


### **Get status of message**

```http
  GET /message/:id/status
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `destination` | `string` | destination of the message |
| `message` | `string` | message id |
| `status` | `enum` | 200 OK |


### **Get metrics**

```http
  GET /metrics
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `destination` | `string` | all the metrics |
| `message` | `string` | number of metrics |
| `status` | `enum` | 200 OK |



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