import { Router } from "express";
import Product from "../Manager/Products.js";

const productsRouter = Router();
const managerP = new Product();

productsRouter.get("/" , (req, res) =>{
    let products = managerP.getProducts();
    res.send(products)
})

productsRouter.get("/:id" , (req, res) =>{
    let id = req.params.id;
    let product = managerP.getProductsById(id);
    res.send(product)
})



export  default productsRouter ;