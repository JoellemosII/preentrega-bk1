import {Router} from "express";
import Product from "../Manager/productsM.js";

const viewsRouter = Router();
const managerP = new Product();

viewsRouter.get("/" , async (req , res) => {
    const{ limit, page, query, sort} = req.query;
    let products = await managerP.getProducts(limit, page, query, sort);  
    res.render( "index", {products:products});
})

viewsRouter.get("/products/" , async (req , res) => {
    const{ limit, page, query, sort} = req.query;
    let products = await managerP.getProducts(limit, page, query, sort);  
    res.render( "index", {products:products});
})

viewsRouter.get("/products/:pid" , async (req , res) => {
    const {pid} = req.params;
    let products = await managerP.getProductById(pid);  
    res.render("product", {products:products[0]});
    
})

viewsRouter.get("/realtimeproducts" , (req , res) => { 
    res.render("realtimeproducts")
});


viewsRouter.get("/cart" , async (req,res) =>{
    const cart = "";
    let carts = await managerC.
res.render("cart" , {carts:carts[0]});
})
export default viewsRouter  