# CS2102

### 7 Feb 2017: Initial commmit
Test-build for pre-alpha demo. Here are the steps to test if web server and database can communicate from web browser.

#### Step 0. NPM Install
> $ npm install

#### Step 1. Start pgsl server
Create/start pgsl server at:
> postgres://localhost:5432/cs2102

#### Step 2. Create Schema with various tables
Run this script and all tables should be created in the database

```
npm run droptables
npm run maketables
npm run fixtures
```

#### Step 3. Start server
`app.js` is the entry point. To start server, run:
> $ nodemon app.js

#### Step 4. Insert test data (POST to db/insertItem)
Send a POST request with data `{ text: "testing 123" }`  
You can do that via the command below, or any other methods (i.e. Postman, etc).
> $ curl --data "text=testing123" http://127.0.0.1:5000/db/insertItem

#### Step 5. View all test data (GET from db/items)
You should be able to view data through this URL:
> http://localhost:5000/db/items
