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




