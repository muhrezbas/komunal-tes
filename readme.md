# test
# KOMUNAL

#### KOMUNAL TEST built Express and Mysql in server.

### User

Routes | HTTP | Body | Description | Error Response  | 
------ | ---- | ---- | ----------- | -----------
/api/register | POST | email:String, password:String | Register new user | email is empty 400, password is empty 400
/api/login | POST | email:String,password:String | Logging in user | username/password invalid 401


### Borrower

Routes | HTTP | Body | Description | Error Response  | Middlewares
------ | ----- | ----- | -------- | -------- | ---
/api/data | GET | none | Show the data | none | Login Authenthication
/api/data/:id | GET | none | Get a single product info | none | Login Authenthication
/api/create | POST | CustomerName:String, DatePurchase:String Amount_due__c:Decimal Discount__c:decimal GST__c:decimal | Create new borrower | error 400 and 401 login | Login Authenthication
/api/data/:id | DELETE | none | Delete by id | none |  Login Authentication
/api/data/:id | PATCH | input new updated data | Edit your list (will change the whole data) |  error 401 login |  Login Authentication 


### Import Data
 ```
 $ node importData.js
 $ ctrl -c
 ```
### Test
```
 $ npm install
 $ npm run test
 ```

## Usage
 Make sure you have Node.js and npm installed in your computer, and then run these commands:
 ```
 $ npm install
 $ nodemon app.js
 ```

  Make sure you have Docker and docker-compose in your computer, and then run these commands:
 ```
 $ docker build --tag komunal-test .
 $ docker-compose up -d
 ```


