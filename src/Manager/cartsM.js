import { cartModel } from "../models/carts.models.js";

class ManagerCart {
    // 
        async getCarts(){
            return await cartModel.find().lean().populate("products.product");
        }
    
        async getCartsById(id){
            return await cartModel.find({_id:id}).lean().populate("products.product");
        }
    
        async createCart(){
            await cartModel.create({products:[]});
        }
    
        async addProductToCart(cid, pid) {
            try {
                let cart = await cartModel.findOne({_id:cid}).lean();
                
                if (!cart) {
                    throw new Error('Carrito no encontrado');
                }
                
                // Buscar el producto en el carrito
                let productIndex = cart.products.findIndex(item => 
                    item.product && item.product.toString() === pid);
                
                if (productIndex !== -1) {
                    // Si el producto existe, incrementar la cantidad
                    cart.products[productIndex].quantity += 1;
                } else {
                    // Si no existe, agregarlo al carrito
                    cart.products.push({product: pid, quantity: 1});
                }
                
                // Actualizar el carrito
                await cartModel.updateOne({_id:cid}, {products: cart.products});
            } catch (error) {
                console.error("Error en addProductToCart:", error);
                throw error;
            }
        } 
        
        async addProductsToCart(cid, products) {
            try {
                let cart = await cartModel.findOne({_id:cid}).lean();
                
                if (!cart) {
                    throw new Error('Carrito no encontrado');
                }
                
                products.forEach(item => {            
                    let productIndex = cart.products.findIndex(cartItem => 
                        cartItem.product && cartItem.product.toString() === item.product.toString());
                    
                    if (productIndex !== -1) {
                        // Si el producto existe, incrementar la cantidad
                        cart.products[productIndex].quantity += item.quantity;                        
                    } else {
                        // Si no existe, agregarlo al carrito
                        cart.products.push({
                            product: item.product, 
                            quantity: item.quantity
                        });
                    }            
                });
                
                await cartModel.updateOne({_id:cid}, {products: cart.products});
            } catch (error) {
                console.error("Error en addProductsToCart:", error);
                throw error;
            }
        }
    
        async updateProductFromCart(cid, pid, quantity) {
            try {
                let cart = await cartModel.findOne({_id:cid}).lean();
                
                if (!cart) {
                    throw new Error('Carrito no encontrado');
                }
                
                let productIndex = cart.products.findIndex(item => 
                    item.product && item.product.toString() === pid);
                
                if (productIndex !== -1) {
                    // Si el producto existe, actualizar la cantidad
                    cart.products[productIndex].quantity = quantity;
                } else {
                    // Si no existe, agregarlo al carrito
                    cart.products.push({
                        product: pid, 
                        quantity: quantity
                    });
                }
                
                await cartModel.updateOne({_id:cid}, {products: cart.products});
            } catch (error) {
                console.error("Error en updateProductFromCart:", error);
                throw error;
            }
        }
    
        async deleteProductFromCart(cid, pid){
            try {
                let cart = await cartModel.findOne({_id:cid}).lean();
                
                if (!cart) {
                    throw new Error('Carrito no encontrado');
                }
                
                // Filtrar para eliminar el producto específico
                let updatedProducts = cart.products.filter(item => 
                    !item.product || item.product.toString() !== pid);
                
                await cartModel.updateOne({_id:cid}, {products: updatedProducts});
            } catch (error) {
                console.error("Error en deleteProductFromCart:", error);
                throw error;
            }
        }
    
        async emptyCart(cid){
            try {
                await cartModel.updateOne({_id:cid}, {products:[]});
            } catch (error) {
                console.error("Error en emptyCart:", error);
                throw error;
            }
        }
    }
export default ManagerCart 