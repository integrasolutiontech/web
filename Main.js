let products = [];
var currentId;
getData();
function getData() {
    // Add a cache-busting parameter to the URL
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(responsedata => {
            if (responsedata.message == 'success') {
                products = responsedata.data;
                showData();
            }
            console.log(products);
        });
}
function getInputValue() {
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDesc = document.getElementById("productDesc").value;
    let product = {
        name: productName,


        price: productPrice,
        descrption: productDesc
    };
    ApiCRUD('POST', product, 'product added sucssefully')
}
function ApiCRUD(endpoint, body, response) {
    fetch("http://localhost:3000/products", {
        method: endpoint,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message == response) {
                getData();
            }
        });
}
function deleteProduct(id) {
    ApiCRUD('DELETE', { id }, 'product deleted sucssefully')
}
function showData() {
    var box = ``;
    for (let i = 0; i < products.length; i++) {
        box += `
<tr>
<td>${products[i].name}</td>
<td>${products[i].price}</td>
<td>${products[i].descrption}</td>
<td>
<button onclick=updateProduct(${products[i].id}) class="btn 
btn-success btn-sm" type="button">Update</button>
<button onclick=deleteProduct(${products[i].id}) class="btn 
btn-danger btn-sm" type="button">Delete</button>
 

</td>
</tr>`;
    }
    document.getElementById("tbody").innerHTML = box;
}
function updateProduct(id) {
    currentId = id;
    let currentItem = products.filter(ele => ele.id == id)[0]
    document.getElementById("productName").value = currentItem.name
    document.getElementById("productPrice").value = currentItem.price
    document.getElementById("productDesc").value = currentItem.descrption
    document.getElementById("add").classList.add("d-none");
    document.getElementById("update").classList.add("d-block");
    console.log(currentItem);
}
function callUpdate() {
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    let productDesc = document.getElementById("productDesc").value;
    let product = {
        name: productName,
        price: productPrice,
        descrption: productDesc,
        id: currentId
    };
    ApiCRUD('PUT', product, 'product updated sucssefully')
}