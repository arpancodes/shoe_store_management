## Getting started

1. Clone the repository
```
git clone https://github.com/arpancodes/shoe_store_management.git
```
2. Install the dependencies
```
npm install
```
3. create `.env` file with the same content as `.env.example` and add the required details.
```
DB_HOST=
DB_USER=root
DB_PASSWORD=
DB=
JWT_SECRET=
```
4. Run `seed.js` script to populate the database with initial data.
```
node seed.js
```
5. Run the server.
```
npm run dev
```

Development server will start http://localhost:3000/
