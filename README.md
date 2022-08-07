# La Bolsa

La Bolsa is a web application used in a pub called **La Bolsa** (_The Stock Change_) to show random prices for the drinks. The prices update automatically every 20 minutes between a minimum and a maximum price decided by the owner using an admin page. Prices go up or down using steps of 0.5€ to be easy to pay.

## Technical details
This proyect is built using the following technologies:
* Node.js v16.15.1.
* React v18.2.0.
* Next.js v12.2.0.
* React-Bootstrap v2.4.0.
* Log4js v6.6.1.
* SQLite3 v5.0.9.

The App uses SQLite3 to store and fetch the drink prices from a database. The update interval can be changed in the file **src/config/LaBolsa.js**.

## App Design

La Bolsa App is built with a responsive layout using bootstrap.

![XXL desktop layout](doc/3-columns.png)
<p align = "center">
XXL desktop layout
</p>

![MD desktop layout](doc/2-columns.png)
<p align = "center">
MD desktop layout
</p>

![XS desktop layout](doc/1-column.png)
<p align = "center">
XS desktop layout
</p>

![Mobile layout](doc/mobile.png)
<p align = "center">
Mobile layout
</p>

## Admin App Design

![XXL desktop layout](doc/admin-page.png)
<p align = "center">
Admin Page
</p>

![XXL desktop layout](doc/add-drink.png)
<p align = "center">
Add drink modal
</p>

![XXL desktop layout](doc/edit-drink.png)
<p align = "center">
Edit drink modal
</p>

![XXL desktop layout](doc/delete-drink.png)
<p align = "center">
Delete drink modal
</p>

## Download the dependencies and run the development server
```bash
npm install
npm run dev
```

The server will be started in the port 3000. This will be the URL: http://localhost:3000

The admin server page will be hosted on http://localhost:3000/admin

## Run tests
There are some test that could be run using the following command:
```
npm test
```

## Build and run the production code
```bash
npm run build
npm run start
```

The server will be started in the port 8080. These are the URLs:

http://localhost:8080


http://localhost:8080/admin

