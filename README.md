## Steps to start up the service
1. npm install
2. npx sequelize db:migrate
3. npm start
   

## To create a model
This will:
- Create a model file user in models folder;
- Create a migration file with name like XXXXXXXXXXXXXX-create-user.js in migrations folder.

```
npx sequelize model:create --name User --attributes name:string,age:integer,gender:string
```

## To generate a seed file
```
sequelize seed:generate --name users
```

## Routes
- GET /bar
    - output
```json
{
    "data": [
        {
            "label": "Adults",
            "data": 2
        },
        {
            "label": "Seniors",
            "data": 1
        },
        {
            "label": "Young Adults",
            "data": 8
        }
    ]
}
```

- GET /pie
    - output
```json
{
    "data": [
        {
            "label": "F",
            "data": 4
        },
        {
            "label": "M",
            "data": 7
        }
    ]
}
```

- GET /chart
    - output
```json
{
    "data": [
        {
            "id": 1,
            "name": "Rubi",
            "age": 31,
            "gender": "F",
            "createdAt": "2022-02-12T04:26:28.000Z",
            "updatedAt": "2022-02-12T04:26:28.000Z"
        }
    ]
}
```

- POST /chart
    - input
```bash
  curl --location --request POST 'http://localhost:3000/chart' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "name": "Rubi",
  "age": 31,
  "gender": "M"
  }'
```
    - success output
```json
{
    "id": 12,
    "name": "Rubi",
    "gender": "M",
    "age": 31,
    "updatedAt": "2022-02-15T05:09:32.349Z",
    "createdAt": "2022-02-15T05:09:32.349Z"
}
```
    - sample error output
```json
{
    "errors": [
        {
            "value": "A",
            "msg": "gender should only be M or F",
            "param": "gender",
            "location": "body"
        }
    ]
}
```



