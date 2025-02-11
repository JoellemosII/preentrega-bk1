import fs from "fs";

class ManagerCart {
    constructor(){
        this.carts = []
        this.file = "carrito.json",
        this.createFile()
    }

    createFile(){
        if(!fs.existsSync(this.file)){
            fs.writeFileSync(this.file , JSON.stringify(this.carts))
        }
    }

    getId(){
        this.getCarts();
        let max = 0;
        this.carts.forEach(item =>{
            if(item.id >max){
                max = item.id;
            }
        })
        return max + 1;
    }

    getCarts(){
        this.carts = JSON.parse(fs.readFileSync(this.file , "utf-8"))
    return this.carts;
    }

    getCartsById(id){
        this.getCarts();
        let cart = this.carts.find(item => item.id == id);
        return cart ? cart.product :{"error":"Carrito no encontrado"};
    }

    createCart(){
        const cart = {id:this.getId(), products : []};
        this.carts.push(cart);
        this.saveCarts();
    }

    addCartProduct(cid, pid){
        this.getCarts();
        let cart = this.carts.find(item => item.id == cid);
        let product = cart.products.find(item => item.product == pid)

        if (product){
            product.quantity += 1;
        }else{
            let product = {product:pid, quantity:1};
            cart.products.push(product);
        }
        this.saveCarts();
    }

    saveCarts(){
        fs.writeFileSync(this.file ,JSON.stringify(this.carts));
    }
}

export default ManagerCart