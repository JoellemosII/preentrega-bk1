import { Router } from "express";
import Product from "../Manager/productsM.js";

const productsRouter = Router();
const managerP = new Product();

productsRouter.get("/" ,async (req, res) =>{
    try{
        let products = await managerP.getProducts();
        res.send(products);
    }catch(error){
        console.log("Error al obtener los productos")
    }
})


productsRouter.get("/:pid" ,async  (req, res) =>{
    let pid = req.params.pid;
    let product = await managerP.getProductById(pid);
    res.send(product);
})

productsRouter.post("/" , async (req,res) => {
    const {title , description , code ,price ,status ,category ,thumbnails} = req.body;

    if(!title){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Title este completo"})
        return false;
    }

    if(!description){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Description este completo"})
        return false;
    }

    if(!code){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Code este completo"})
        return false;
    }

    if(!price){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Price este completo"})
        return false;
    }

    if(!status){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Status este completo"})
        return false;
    }

    if(!category){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Category este completo"})
        return false;
    }

    let product = {title , description , code ,price ,status ,category ,thumbnails};
    await managerP.addProduct(product);
    res.send({"estado": "OK", "mensaje": " Producto agregado exitosamente"});
})

productsRouter.put("/:pid" , async (req,res) => {
    const pid = req.params.pid;
    const {title , description , code ,price ,status ,category ,thumbnails} = req.body;

    if(!title){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Title este completo"})
        return false;
    } 

    if(!description){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Description este completo"})
        return false;
    }

    if(!code){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Code este completo"})
        return false;
    }

    if(!price){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Price este completo"})
        return false;
    }

    if(!status){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Status este completo"})
        return false;
    }

    if(!category){
        res.status(400).send({"estado":"Error", "mensaje":" Lo sentimos verifique que el campo Category este completo"})
        return false;
    }

    let product = {title , description , code ,price ,status ,category ,thumbnails};
    await managerP.editProduct(pid,product);
    res.send({"estado": "OK", "mensaje": " Producto actualizado exitosamente"});
})

productsRouter.delete("/:pid" , async (req,res) =>{
    const pid = req.params.pid;
    await managerP.deleteProduct(pid);
    res.send({"estado":"OK" , "mensaje" :"Producto eliminado exitosamente"})
})

export default productsRouter 