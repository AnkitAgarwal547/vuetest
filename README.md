Project Upstar

IDE: Visual Studio Code

## How to run

### Client

 - Open the terminal in the project folder
- Go to the client directory by typing: ‘cd client’
- Type the following command in the terminal: ‘npm run serve’
- At the end of the process, it will tell the server and port on which the project is deployed. As of now it will be running on the localhost.
- Open the link. Now it will display the homepage of the website

### Server

Type the following command:’node server/index.js’
Now it will start listening on the port 8000 of the localhost.

### What has been covered so far

##### A. Database used as part of the project: MongoDB
  - Created a MongoDB database : BoxDB
  - Created 3 Collections
  -  Items : This is similar to products. It will store the details of the items such as itemid, name, price, quantity, imageFiles and rating.

 - Boxtype : This is used for creating standard Box types for storing predefined items. Along with that, this stores the type, name, free shipping limit and total price.

- BoxCart : This contains the user specific Box carts.

Used MongoDB API in the server side project to connect to the database. It defined the user name, database name and the password to the remote database.

##### B. Server Side APIs:

Created APIs in the server side code to receive requests for various operations to be performed on the data. The various requests incorporated are: GET, POST, PUT, DELETE. Used ‘app.use’ and routers to route the request to the corresponding method.

## Client Side Models:

Created model classes for Items, Box Carts and BoxTypes to define the values for data members and create requests for server side APIs.

##### C. Admin Panel Functionalities:

###### Items Maintenance:

It will display all the items in the Items collection. Admin can update existing items by changing their price, quantity and name.

###### Create New Box: 
Using this, the admin can create a new box type by filling in box type, box name and its free shipping limit.

###### Modify Box Type:
This will display the details of the existing box types. The user can modify the box types by increasing/ decreasing the quantities of the items or deleting them.

###### Create Box Cart:
This gives provision for creating a box cart from amongst the existing box types. As a result, the box cart will contain the items that have been predefined in the corresponding box type.

###### Modify Box Cart: 
Using this, the box cart can be modified by deleting items alreading existing in the cart, changing their quantities and adding new items.

##### D. User functionalities

Loading products/items details on the front end.
Upon clicking the ‘Add to cart’ button, the item is added to the user cart.
### Pending

Modify AppHeaders program to reflect the changes in the cart in the AppHeaders.vue file. Currently, the users and boxtypes on the admin panel have been hard coded. Their dynamicity is yet to be added. Display list of items in the box cart and images for the user
