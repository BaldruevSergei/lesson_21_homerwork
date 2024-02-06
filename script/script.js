// реализовать процесс, который при отправке формы выводит данные нового продукта 
// в консоль

const addProductNode = document.querySelector("#add_product");
let products= [];
addProductNode.addEventListener("submit", event =>  {
    event.preventDefault();

    const title = event.target.title.value;
    const price = +event.target.price.value;
    const count = +event.target.count.value;
    console.log(title, price, count);  
    const product = {title, price, count};
    products.push(product);
    rerender();
    console.log(products); 
     event.target.reset();
     
})



// доработать обработчик формы таким образом
// чтобы при отправке формы в массив products 
// добавлялся объект со свойствами title, price, count

function createProductCart(title, price, count){
    const containerNode = document.createElement('div');
    const titleNode = document.createElement('p'); 
    const priceNode = document.createElement('p');
    const countNode = document.createElement('p');
    const deleteNode = document.createElement("button");
    const plusNode = document.createElement("button");
    const minusNode = document.createElement("button");
    containerNode.classList.add('product_cart');
    containerNode.style.borderColor = count === 0? "#c0392b" : "#16a085";
    titleNode.innerText = title;
    priceNode.innerText = price;
    countNode.innerText = count === 0? "Товар кончился" : count;
    deleteNode.innerText = "Удалить"; 
    plusNode.innerText = "+";
    minusNode.innerText = "-";
    containerNode.append(titleNode, priceNode, countNode, deleteNode, plusNode, minusNode);
    
    deleteNode.addEventListener("click", () => {
        remove(title);
     });

    plusNode.addEventListener("click", () => {
        plusCount(title);
     });

    minusNode.addEventListener("click", () => {
        minusCount(title);
     });

    return containerNode;
}
   

//const productsNode = document.querySelector('.products');
//const productNode = createProductCart(product.title, product.price, 0);
//productsNode.append(productNode);
// добавить очистку productsNode

    // пройтись циклом по массиву products и для каждого объекта создать карточку 
    // с продуктом и добавить эту карточку в productsNode
function rerender (){
    const productsNode = document.querySelector(".products");
    productsNode.innerText = "";
    if (products.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.innerText = "Товаров нет";
        productsNode.append(noProductsMessage);
    } else {
    products.forEach(({title, price, count}) => productsNode.append(createProductCart(title, price, count)));
    }

};

function remove(title) {
    const newProductsArray = products.filter(product => product.title !== title); // оставляем только те пролдуктыкотреы не равны те кторые мы хотим удалить 
    products = newProductsArray;
    rerender();
}

function plusCount(title) {
    products = products.map(product => 
        product.title === title ?  {...product, count: product.count + 1} : product
    );
    rerender();
}

function minusCount(title) {
    products = products.map(product =>
        product.title === title && product.count > 0 ? { ...product, count: product.count - 1 } : product
    );
    rerender();
}

// Добавьте отбивку "товаров нет", которая должна отображаться в ситуации, если массив с товарами пустой

// Добавьте кнопки "+" и "-" для управления кол-вом товаров в карточке.