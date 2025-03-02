import { Router } from "express";
import ManagerCart from "../Manager/cartsM.js";

const cartsRouter = Router();
const managerC = new ManagerCart();

cartsRouter.get("/" , async  (req, res) =>{
    const carts = await managerC.getCarts();
    res.send(carts);
})
cartsRouter.get("/:cid" , async (req, res) =>{
    const cid = req.params.cid;
    const cart = await managerC.getCarts(cid);
    res.send(cart);
})

cartsRouter.post("/" , async (req, res) =>{
    await managerC.createCart();
    res.send({"estado": "OK", "mensaje": " Carrito creado exitosamente"});
})
cartsRouter.post("/:cid/product/:pid", async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    await managerC.addProductToCart(cid,pid);
    res.send({"estado": "OK", "mensaje": " Se agrego correctamente el producto al carrito"});
})

cartsRouter.put("/:cid" ,async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid; 
    await managerC.addProductToCart(cid , pid);
    res.send({"estado":"Ok" , "mensaje": "Se actualizo el carrito Correctamente"});
})
cartsRouter.put("/:cid/product/:pid" ,async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    await managerC.updateProductFromCart(cid , pid, quantity);
    res.send({"estado":"Ok" , "mensaje": "Se actualizo el carrito Correctamente"})
})

cartsRouter.delete("/:cid/product/:pid" ,async (req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    await managerC.deleteProductFromCart(cid , pid);
    res.send({"estado":"Ok" , "mensaje": "Se elimino el producto del carrito Correctamente"});
})
cartsRouter.delete("/:cid" ,async (req,res)=>{
    const cid = req.params.cid;
    await managerC.deleteProductFromCart(cid);
    res.send({"estado":"Ok" , "mensaje": "Se elimino del carrito Correctamente"});
})

export  default cartsRouter 