import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartRouter.js";

const app = express();
const port = 4040;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products" , productsRouter);
app.use("/api/carts" , cartsRouter);
app.listen(port , () =>{
    console.log("Se conecto con exito al puerto: " + port);
})
