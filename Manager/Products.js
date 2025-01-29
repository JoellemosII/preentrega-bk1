import fs from "fs"

class Product {
    constructor (){
        this.products = [];
        this.file = "products.json"
        this.createFile();
    }

    createFile(){
        if(!fs.existsSync(this.products)){
            fs.writeFileSync(this.file , JSON.stringify(this.products))
        }

    }

    getProducts(){
        this.products = JSON.parse(fs.readFileSync(this.file , "uft-8"))
    return this.products;
    }

    getProductsById(id){
        this.products = JSON.parse(fs.readFileSync(this.file , "uft-8"))
        let product = this.products.find(item => item.id == id);
        return product;
    }

    addProducts(product){
    return this.products;
    }

    editProducts(id , product){
        return this.products;
    }

    deleteProducts(id){
        return this.products;
    }
}

export default Product ;