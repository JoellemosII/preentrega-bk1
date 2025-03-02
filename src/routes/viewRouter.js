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
    res.render( "product", {products:products});

})

viewsRouter.get("/realtimeproducts" , (req , res) => { 
    res.render("realtimeproducts");
})

viewsRouter.get("/carts:cid" , async (req,res)=>{
const cid = req.params.cid;
const carts = await managerP.getCarts(cid);
res.render("products" , {products});
});

export default viewsRouter  