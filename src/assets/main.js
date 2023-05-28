console.log("Hello World");

const API_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=5&api_key=live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s';

const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');
const img3 = document.querySelector('#img3');

const loadMoreBtn = document.querySelector('#loadMoreBtn');

// Llamamos a fetch(Nuestra API), lo guardamos en "res" y lo parseamos a json, y lo guardamos en "data"
// Le asignamos la URL de las imagenes que nos trajo la API a nuestras imagenes del HTML.
const loadRandomMichis = async () => {
    const res = await fetch(API_RANDOM);
    const data  = await res.json();

    console.log(data);

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
};

loadMoreBtn.addEventListener('click', loadRandomMichis);


loadRandomMichis();