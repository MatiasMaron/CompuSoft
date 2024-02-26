const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
   containerCartProducts.classList.toggle('hidden-cart');
});


/* Esto es el filtro de busqueda, basicamente se compara la palabra "buscada" y los nombres de los items en minuscula, por si hay error de tipeo, y si se encuentra, se filtra*/
document.addEventListener('keyup', e =>{

    if (e.target.matches('#buscador')){

        if (e.key === 'Escape')e.target.value = '';

        document.querySelectorAll('.item').forEach(elemento =>{

            elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?elemento.classList.remove('filtro')
                :elemento.classList.add('filtro')
        });

    }
});

/* Variables carrito */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Varibales de arreglos de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
    /* Lo que se hace aca es que cuando uno clickea dentro de cada item en la pagina busca si el objeto que se clickeo tiene la clase "btn-add-cart, si no la tiene devuelve false" */
    if(e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        /* Lo que se hace aca es que se extrae todo lo que el elemento seleccionado es parent y dentro de esa informacion se busca lo que se desea, por ejemplo el nombre y el precio del producto */
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        /* Lo que va a hacer esto es que va a chequear si dentro de los productos que hay en el array allProducts, hay productos que compartan nombre y devuelve true o false respectivamente*/
        const exist = allProducts.some(product => product.title === infoProduct.title);

        if (exist){
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else{
                    return product
                }
            })
            allProducts = [...products]
        }else {
            allProducts = [...allProducts, infoProduct];
        };

        showHTML();
    }
});

/* Filtrado para borrar elementos del carrito */
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        console.log(allProducts);
        showHTML();
    }
});

// Funcion para mostrar HTML
const showHTML = () => {

    if (!allProducts.length){
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else{
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');        
    }

    /* Limpiar HTML*/
    rowProduct.innerHTML = '';

    let totalDineroPagar = 0;
    let totalOfProducts = 0;

    /* Aca lo que se hace es que por cada producto que se seleccione se crea un elemento (div) y se añade a el carrito */
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="icon-close"
            >
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M6 18 18 6M6 6l12 12" 
                />
            </svg>
        `;

        rowProduct.append(containerProduct);


        /* Con esto vamos a estar calculando el total de costo en el carrito */
        totalDineroPagar = totalDineroPagar + parseInt(product.quantity * product.price.slice(1));

        /* Con esto vamos a estar calculando el total de productos*/
        totalOfProducts = totalOfProducts + product.quantity;

    });

    valorTotal.innerText = `$${totalDineroPagar}`;
    countProducts.innerText = totalOfProducts;
};
