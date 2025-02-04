import fs from "fs"

class Product {
    constructor (){
        this.products = [];
        this.file = "products.json"
        this.createFile();
    }

    createFile(){
        if(!fs.existsSync(this.file)){
            fs.writeFileSync(this.file , JSON.stringify(this.products))
        }
    }

    getProducts(){
        this.products = JSON.parse(fs.readFileSync(this.file , "utf-8"))
    return this.products;
    }

    getProductsById(id){
        this.getProducts();
        let product = this.products.find(item => item.id == id);
        return product ? product :{"error":"Producto no encontrado"};
    }

    getId(){
        this.getProducts();
        let max = 0;
        
        this.products.forEach(item =>{
            if(item.id >max){
                max = item.id;
            }
        })
        return max + 1;
    }

    addProducts(product){
        this.getProducts()
        let newProduct = {id:this.getId(), ...product};
        this.products.push(newProduct);
        this.saveProducts();
    }

    saveProducts(){
    fs.writeFileSync(this.file ,JSON.stringify(this.products));
    }

    editProducts(id , product){
        this.getProducts()
        let actualProduct = this.products.find(item => item.id ==id);
        actualProduct.title = product.title;
        actualProduct.description = product.description;
        actualProduct.code = product.code;
        actualProduct.price = product.price;
        actualProduct.status = product.status;
        actualProduct.category = product.categoty;
        actualProduct.thumbnails = product.thumbnails;
        this.saveProducts(); 
    }

    deleteProducts(id){
        this.getProducts()
        this.products = this.products.filter(item => item.id !=id);
        this.saveProducts(); 
    }
}

export default Product ;