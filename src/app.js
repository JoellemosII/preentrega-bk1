import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewRouter.js";
import ManagerProduct from "./Manager/productsM.js";
import mongoose from "mongoose";
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


mongoose.connect("mongodb+srv://joel94master:Johel_0725@mongoose.ejvbi.mongodb.net/?retryWrites=true&w=majority&appName=Mongoose"),(error) =>{
    if(error){
        console.log("No se pudo conectar a la base de datos ");
        process.exit;
    }
}

socketServer.on("connection", async  socket => {
    const managerP = new ManagerProduct();
    const products =  await managerP.getProducts();
    socket.emit("realtimeproducts", products)

    socket.on("nuevoProducto" ,  async data => {
        const product = {title:data.title, description:data.description, code:data.code, price:data.price, category:data.category, thumbnails:data.thumbnails}
        await managerP.addProduct(product)
        console.log("Se agrego un nuevo Producto")
        const products =  await managerP.getProducts();
        console.log(products);
        socket.emit("realtimeproducts", products)
    })

    socket.on("deleteProducto" ,  async data => {
        await managerP.deleteProduct(data)
        console.log("Producto eliminado ")
        const products =  await managerP.getProducts();
        socket.emit("realtimeproducts", products)
    })
})
