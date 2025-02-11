const socket = io();

socket.on("realtimeproducts", data =>{
    renderSelect();
    let contenidoHTML ="";
    const productId = document.getElementById("product_id");
    data.forEach(item => {
        contenidoHTML += ` <div class="col-md-3">
                <div class="card text-center" style="width: 18rem;">
                    <img src="${item.thumbnails}" class="img-fluid" alt="${item.title}">
                    <div class="card-body">
                        <p class="card-text fw-medium">${item.title}</p>
                        <p class="card-text">$${item.price}  ARS</p>
                    </div>
                </div>
            </div>`;

            itemEliminarProducto(item);
    });
    contenidoHTML+= "";
    document.getElementById("contenido").innerHTML = contenidoHTML;
})

const addProducto = () =>{
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const category = document.getElementById("category").value;
    const thumbnails = document.getElementById("thumbnails").value;
    const product = {title , description , code , price , category , thumbnails};
    socket.emit("nuevoProducto" , product);
    title.value = "";
    description.value = "";
    code.value = "";
    price.value = "";
    category.value = "";
    thumbnails.value = "";
    document.getElementById("alerta1").innerHTML = `<div class="alert alert-success" role="alert">¡Producto Agregado Con Exito!</div>`;
} 

const deleteProducto = () =>{
    const product_id = document.getElementById("product_id").value;
    socket.emit("deleteProducto" , product_id);
    document.getElementById("alerta2").innerHTML =`<div class="alert alert-danger" role="alert">¡Producto Eliminado Con Exito!</div>`;
}

const renderSelect = () =>{
    const productId = document.getElementById("product_id");
    productId.innerHTML = "";
}

const itemEliminarProducto = (item) =>{
    const productId = document.getElementById("product_id");
    let option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = "Producto #" +  item.id + item.title;
    productId.appendChild(option);
}