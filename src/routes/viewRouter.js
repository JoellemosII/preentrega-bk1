import {Router} from "express";
import Product from "../Manager/productsM.js";

const viewsRouter = Router();
const managerP = new Product();

viewsRouter.get("/" , (req , res) => {
    let products = managerP.getProducts();  
    res.render( "home", {products:products});
})

viewsRouter.get("/realtimeproducts" , (req , res) => { 
    res.render("realtimeproducts");
})

export default viewsRouter 