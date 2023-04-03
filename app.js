class Product{
    constructor(id, title,image, quantity, sold, price){
        this.id = id;
        this.title = title;
        this.image = image;
        this.quantity = quantity;
        this.sold = sold;
        this.price = price;
    }
}
let PRODUCT_KEY = "PRODUCT_KEY";

let products = [];

init();
function init(){

    if(localStorage.getItem(PRODUCT_KEY)!=null){
        products = JSON.parse(localStorage.getItem(PRODUCT_KEY));
    }else{
        products = [
            new Product(1, "Doritos Nacho Cheese Flavored Tortilla Chips - 14.5oz", 
            "photos/donito.png", 100, 0, 10000),
            new Product(12, "Simply Orange Pulp Free Juice - 52 fl oz", 
            "photos/orange.png", 500, 0, 10000),
            new Product(3, "Bertolli Frozen Chicken Florentine & Farfalle - 22oz", 
            "photos/bertolli.png", 200, 0, 10000),
            new Product(4, "Reese Easter Peanut Butter Eggs - 7.2oz/6ct", 
            "photos/ree.png", 100, 0, 10000),
        ];
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    }
    
}

drawProducts();

function drawProducts(){
    document.getElementsByClassName("products")[0].innerHTML = "";
    for(let i=0;i<products.length;i++){
        // document.querySelector(".products")
        document.getElementsByClassName("products")[0].innerHTML += `
                <div class="specific-product">
                <div class="product-photo">
                    <img src="${products[i].image}"
                        alt="product.photo">
                </div>
                <p class="product-name">${products[i].title}</p>
                <p class="status">Sold count: ${products[i].sold} | Left: ${products[i].quantity - products[i].sold}</p>
                <p class="product-price">${products[i].price}</p>
                <div class="add-button">
                    <button class="add-to-cart" onclick="addToCart(
                        'png',
                        'OREO Chocolate Sandwich Cookies Family Size - 19.1oz',
                        '20000'
                    )">Add to cart</button>
                </div>
                <div class="edit-button">
                    <button class="edit-product" onclick="handleEditButtonClick(${products[i].id})">Edit</button>
                </div>
                <div class="delete-button">
                    <button class="delete-product" onclick="handleDeleteClick(${products[i].id})">Delete</button>
                </div>
            </div>
        `
    }
}


function handleAddProductClick(){
    document.getElementsByClassName("input-table")[0].style.display = "block";

}

function handleAddProduct(){
    let errors = [];
    let title = document.getElementById("inputting-product-name").value;
    let image = document.getElementById("inputting-product-photo").value;
    let quantity = +document.getElementById("inputting-product-quantity").value;
    let price = +document.getElementById("inputting-product-price").value;

    if(title == ''){
        errors.push('Tên không được để trống');
    }
    if(image == ''){
        errors.push('Hình ảnh không được để trống');
    }
    if(quantity<0 || quantity > 1000){
        errors.push('Số lượng phải từ 0-1000');
    }
    if(price<0 || price > 10000000){
        errors.push('Số lượng phải từ 0-10000000');
    }
    if(errors.length > 0){
        let str = "";
        for(let i=0;i<errors.length;i++){
            str += errors[i] + "\n";
        }
        alert(str);
    }else{
        let id;
        if(getMaxId()==-1){
            id = 1;
        }else{
            id = getMaxId();
        }
        let p = new Product(id, title, image, quantity, 0, price);
        products.push(p);

        localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
        document.getElementsByClassName("input-table")[0].style.display = "none";
        drawProducts();
    }
}

function getMaxId(){
    if(products.length>0){
        let maxProduct = products[0];

        for(let i=1;i<products.length;i++){
            if(products[i].id > maxProduct.id){
                maxProduct = products[i];
            }
        }
        return maxProduct.id;
    }else{
        return -1;
    }
    
}

function handleEditButtonClick(id){
    // id = 3;
    document.getElementsByClassName("edit-table")[0].style.display = "block";
    document.getElementById("idEdit").value = id;

    let product = findProductById(id);
    if(product!=null){
        document.getElementById("editting-product-name").value = product.title;
        document.getElementById("editting-product-photo").value = product.image;
        document.getElementById("editting-product-sold-count").value = product.sold;
        document.getElementById("editting-product-quantity").value = product.quantity;
        document.getElementById("editting-product-price").value = product.price;
    }else{
        alert("Không tìm thấy sản phẩm với id là " + id);
    }

}

function findProductById(id){
    for(let i= 0;i<products.length;i++){
        if(products[i].id == id){
            return products[i];
        }
    }
    return null;
}

function handleEditProduct(){
    let id = +document.getElementById("idEdit").value;
    let title = document.getElementById("editting-product-name").value;
    let image = document.getElementById("editting-product-photo").value;
    let sold = document.getElementById("editting-product-sold-count").value;
    let quantity = document.getElementById("editting-product-quantity").value;
    let price = document.getElementById("editting-product-price").value;

    let pNew = new Product(id, title, image, sold, quantity, price);
    updateProductById(id, pNew);

    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
    drawProducts();
    document.getElementsByClassName("edit-table")[0].style.display = "none";
}
function updateProductById(id, productNew){
    for(let i=0;i<products.length;i++){
        if(products[i].id == id){
            products[i].title = productNew.title;
            products[i].image = productNew.image;
            products[i].quantity = productNew.quantity;
            products[i].price = productNew.quantity;
            products[i].price = productNew.price;
        }
    }
}
function closeEditTable(){
    document.getElementsByClassName("edit-table")[0].style.display = "none";
}
function handleDeleteClick(id){
    let check = confirm("Bạn có chắc chắn xóa không?");
    if(check){
        for(let i=0;i<products.length;i++){
            if(products[i].id == id){
                products.splice(i, 1);
                break;
            }
        }
        localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
        drawProducts();
    }
    
}