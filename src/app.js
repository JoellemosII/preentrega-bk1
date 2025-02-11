import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewRouter.js";
import ManagerProduct from "./Manager/productsM.js";

const app = express();
const port = 4040;

const httpServer = app.listen(port, () => {
    console.log("Servidor activo: " + port);
})
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products" , productsRouter);
app.use("/api/carts" , cartsRouter);
app.use("/" , viewsRouter);

socketServer.on("connection", socket => {
    const managerP = new ManagerProduct();
    const products = managerP.getProducts();
    socket.emit("realtimeproducts", products)

    socket.on("nuevoProducto" , data => {
        managerP.addProducts(data)
        const products = managerP.getProducts();
        socket.emit("realtimeproducts", products)
    })

    socket.on("deleteProducto" , data => {
        managerP.deleteProducts(data)
        const products = managerP.getProducts();
        socket.emit("realtimeproducts", products)
    })
})
