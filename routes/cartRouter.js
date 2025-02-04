import { Router } from "express";
import ManagerCart from "../Manager/cartsM.js";

const cartsRouter = Router();
const managerC = new ManagerCart();

cartsRouter.get("/" , (req, res) =>{
    const carts = managerC.getCarts();
    res.send(carts)
})

cartsRouter.post("/" , (req, res) =>{
    managerC.createCart();
    res.send({"estado": "OK", "mensaje": " Carrito creado exitosamente"});
})

cartsRouter.get("/:cid" , (req, res) =>{
    const cid = req.params.cid;
    const cart = managerC.getCarts(cid);
    res.send(cart);
})

cartsRouter.post("/:cid/product/:pid", (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    managerC.addCartProduct(cid,pid);
    res.send({"estado": "OK", "mensaje": " Se agrego correctamente el producto al carrito"});
})

export  default cartsRouter 