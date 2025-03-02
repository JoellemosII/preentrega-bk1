import { productModel } from "../models/products.models.js";

class ManagerProduct {
    async getProducts(limit, page, query, sort) {
        try {
            limit = limit ? limit : 10;
            page = page >= 1 ? page : 1;
            query = query ? query : "";
            sort = sort === "desc" ? { price: -1 } : { price: 1 };
            
            let result;    

            if (query) {            
                result = await productModel.paginate({category:query}, {limit:limit, page:page, sort:sort, lean:true});
            } else {                
                result = await productModel.paginate({}, {limit:limit, page:page, sort:sort, lean:true});
            }

            result = {status:"success", payload:result.docs, totalPages:result.totalPages, prevPage:result.prevPage, nextPage:result.nextPage, page:result.page, hasPrevPage:result.hasPrevPage, hasNextPage:result.hasNextPage, prevLink:(result.hasPrevPage ? "/?limit=" + limit + "&page=" + (result.page-1) : null), nextLink:(result.hasNextPage ? "/?limit=" + limit + "&page=" + (result.page+1) : null)};
    
            return result;
        } catch (error) {
            return {status:"error", payload:""}
        }
    }
    async getProductById(id) {        
        let product = await productModel.find({_id:id});
        
        return product ? product : {"error":"No se encontró el Producto!"};
    }

    async addProduct(product) {
        await productModel.create({...product});
    }

    async editProduct(id, product) {
        await productModel.updateOne({_id:id}, {...product});
    }

    async deleteProduct(id) {
        await productModel.deleteOne({_id:id});
    }
}


export default ManagerProduct 