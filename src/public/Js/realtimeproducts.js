const socket = io();

socket.on("realtimeproducts", data =>{
    limpiarSelectEliminarProducto();
    let contenidoHTML ="";
    data.payload.forEach(item => {
        contenidoHTML += ` <div class="col-md-3">
                <div class="card text-center" style="width: 18rem;">
                    <img src="${item.thumbnails}" class="img-fluid" alt="${item.title}">
                    <div class="card-body">
                        <p class="card-text fw-medium">${item.title}</p>
                        <p class="card-text">$${item.price}  ARS</p>
                    </div>
                </div>
            </div>`;
            agregarItemEliminarProducto(item);
    });
    contenidoHTML+= "";
    document.getElementById("contenido").innerHTML = contenidoHTML;
})

const addProducto = () =>{
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const code = document.getElementById("code");
    const price = document.getElementById("price");
    const category = document.getElementById("category");
    const thumbnails = document.getElementById("thumbnails");
    const product = {title:title.value , description:description.value , code:code.value , price:price.value , category:category.value , thumbnails:thumbnails.value};
    socket.emit("nuevoProducto" , product);
    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    category.value = "";
    thumbnails.value = "";
    document.getElementById("alerta1").innerHTML = `<div class="alert alert-success" role="alert">¡Producto Agregado Con Exito!</div>`;
} 

const limpiarSelectEliminarProducto = () =>{
    const productId = document.getElementById("product_id");
    productId.innerHTML = "";
}

const agregarItemEliminarProducto  = (item) =>{
    const productId = document.getElementById("product_id");
    let option = document.createElement("option");
    option.value = item._id;
    option.innerHTML = "Producto #" + item.id + item.title;
    productId.appendChild(option);
}

const deleteProducto = () =>{
    const product_id = document.getElementById("product_id").value;
    socket.emit("deleteProducto" , product_id);
    document.getElementById("alerta2").innerHTML =`<div class="alert alert-danger" role="alert">¡Producto Eliminado Con Exito!</div>`;
}