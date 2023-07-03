const api_key = "live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s";

const api_axios = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {'X-API-KEY': `${api_key}`}
});

const API_RANDOM = `https://api.thedogapi.com/v1/images/search`;
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_UPLOADS = "https://api.thedogapi.com/v1/images/upload";

const sectionsContainer__spanError = document.querySelector("#sectionsContainer__spanError");

// Evento y funcion para boton de Corazoncito de Like

const iconHeart1 = document.querySelector("#iconHeart1");
const iconHeart2 = document.querySelector("#iconHeart2");
const iconHeart3 = document.querySelector("#iconHeart3");

// Funciones y eventos para boton de Like

const changeOfLikeIcon = (numero) => {
    // Esta funcion va a entrar cuando le den click al icono de heart button, vamos a validar, si el icono tiene la clase fa-regular, le vamos a agregar la de fa-solid, para hacerlo el de like y si ya tiene la de solid, ya no agregamos nada y lo dejamos como estaba

    if (numero == '1') {
        if (iconHeart1.classList.contains('fa-regular')) {
            // pon el solid
            iconHeart1.classList.remove('fa-regular');
            iconHeart1.classList.add('fa-solid');
        }
    }

    if (numero == '2') {
        if (iconHeart2.classList.contains('fa-regular')) {
            // pon el solid
            iconHeart2.classList.remove('fa-regular');
            iconHeart2.classList.add('fa-solid');
        }
    }

    if (numero == '3') {
        if (iconHeart3.classList.contains('fa-regular')) {
            // pon el solid
            iconHeart3.classList.remove('fa-regular');
            iconHeart3.classList.add('fa-solid');
        }
    }
    
}

const getBackToNormalHeart = () => {
    if (iconHeart1.classList.contains('fa-solid')) {
        iconHeart1.classList.remove('fa-solid');
        iconHeart1.classList.add('fa-regular');
    }
    if (iconHeart2.classList.contains('fa-solid')) {
        iconHeart2.classList.remove('fa-solid');
        iconHeart2.classList.add('fa-regular');
    }
    if (iconHeart3.classList.contains('fa-solid')) {
        iconHeart3.classList.remove('fa-solid');
        iconHeart3.classList.add('fa-regular');
    }

}

iconHeart1.onclick = () => changeOfLikeIcon('1');
iconHeart2.onclick = () => changeOfLikeIcon('2');
iconHeart3.onclick = () => changeOfLikeIcon('3');

// Funciones para boton de Upload own Lomito

let file_button = document.querySelector('#file_button');
let imgLomitoUploaded = document.querySelector('#imgLomitoUploaded');
let file_name = document.querySelector('#file_name');
let uploadSection__published_label = document.querySelector('#uploadSection__published_label');

const showThumbnailAndPicName = () => {
    let reader = new FileReader();
    reader.readAsDataURL(file_button.files[0]);
    console.log(file_button.files[0]);

    reader.onload = () => {
        imgLomitoUploaded.setAttribute('src', reader.result);
    }

    file_name.textContent = file_button.files[0].name;
}

const removeThumbnailAndPicName = () => {
    imgLomitoUploaded.removeAttribute('src');
    file_name.innerHTML = '';
}

file_button.onchange = () => showThumbnailAndPicName();



// ----------------------- Llamadas a la API -----------------------------------------

// Llamamos a fetch(Nuestra API), lo guardamos en "res" y lo parseamos a json, y lo guardamos en "data"
// Le asignamos la URL de las imagenes que nos trajo la API a nuestras imagenes del HTML.
const loadRandomLomitos = async () => {
    
    try {
        const res = await fetch(`${API_RANDOM}?limit=3&api_key=${api_key}`);
        
        if (res.status !== 200) {
            statusCode = res.status;
        }
        
        const data = await res.json();
        
        console.log("Random Lomitos");
        console.log(data);
        
        const btnSaveLomito1 = document.querySelector("#btnSaveLomito1");
        const btnSaveLomito2 = document.querySelector("#btnSaveLomito2");
        const btnSaveLomito3 = document.querySelector("#btnSaveLomito3");
        
        const img1 = document.querySelector("#img1");
        const img2 = document.querySelector("#img2");
        const img3 = document.querySelector("#img3");
        
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
        //const img3Id = data[2].id;

        
        
        // IMPORTANT Syntax of add event listener
        // When we have functions that sends our parameters
        // Arrow Function before the function avoids the automatically calling of the function without a click 

        
        // btnSaveLomito1.addEventListener("click", () => saveFavoriteLomitos(data[0].id), {once: true});
        // btnSaveLomito2.addEventListener("click", () => saveFavoriteLomitos(data[1].id), {once: true});
        // btnSaveLomito3.addEventListener("click", () => saveFavoriteLomitos(img3Id), {once: true});
        
        // We used event Handlers because eventListeners were having issues at the moment to excecute them multiple times, they were saving the old value and bringind it in future requests
        btnSaveLomito1.onclick = () => saveFavoriteLomitos(data[0].id);
        btnSaveLomito2.onclick = () => saveFavoriteLomitos(data[1].id);
        btnSaveLomito3.onclick = () => saveFavoriteLomitos(data[2].id);

        getBackToNormalHeart();

    } catch (error) {
        console.error("VGG - Random Error: " + error.message);
        sectionsContainer__spanError.innerText = "OOOPS! hubo un error :( , STATUS: " + statusCode + ", MENSAJE: " + error.message;
    }
    
};

const loadFavorteLomitos = async () => {
    try {
        const res = await fetch(`${API_FAVORITES}?api_key=${api_key}`);
        if (res.status !== 200) {
            statusCode = res.status;
            // throw new Error(
            //     "Error de peticion HTTP en Favoritos, Status: " + res.status
            // );
        }

        const data = await res.json();
        console.log("Favorite Lomitos");
        console.log(data);

        const lomitosContainer = document.querySelector('#lomitosCardsContainer'); // Posiblemente la podamos poner en un Scope mas Global
        lomitosContainer.innerText = "";

        for (const element of data) {
            const article = document.createElement('article');
            article.classList.add("articleImgContainer");
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const span = document.createElement('span');
            const icon = document.createElement('i');

            span.classList.add('spanIconContainer');
            icon.classList.add('fa-solid', 'fa-xmark');
            btn.classList.add('btnCircle');

            span.appendChild(icon);
            btn.appendChild(span);

            // const btnDeleteFromFavText = document.createTextNode('Eliminar de Favoritos');
            // btn.appendChild(btnDeleteFromFavText);

            // Crear evento para cada boton que pertenece a una card del lomito seleccionado y le mandamos su image ID
            btn.addEventListener('click', () => deleteFavoriteLomito(element.id));

            img.classList.add("randomSection__lomito-image");
            img.alt = "lomito-picture";
            img.src = element.image.url;

            article.appendChild(img);
            article.appendChild(btn);

            lomitosContainer.appendChild(article);
        }


    } catch (error) {
        console.error("VGG - Favorites error: " + error.message);
        sectionsContainer__spanError.innerText =
            "OOOPS! hubo un error :( , STATUS: " +
            statusCode +
            ", message: " +
            error.message;
    }
};

const saveFavoriteLomitos = async (imageID) => {
    try {
        const {data, status} = await api_axios.post('/favourites', {
            image_id: imageID,
        });


        // const res = await fetch(`${API_FAVORITES}?api_key=${api_key}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         image_id: imageID,
        //     }),
        // });

        // const data = await res.json();

        // if (res.status !== 200) {
        //     statusCode = res.status;
        // }

        if (status !== 200) {
            statusCode = status;
        }

        console.log("Lomito saved: ");
        console.log(data);

        loadFavorteLomitos();

    } catch (error) {
        console.error("VGG - Save Favorites Error: " + error.message);
        // Con axios asi no jala usando el statuscode
        sectionsContainer__spanError.innerText =
            "OOOPS! Hubo un error! :( , STATUS: /* statusCode */ MESSAGE: " + error.message;
    }
};

const deleteFavoriteLomito = async (imageID) => {
    try {

        const res = await fetch(`${API_FAVORITES}/${imageID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s'
            }
        });

        if (res.status !== 200) {
            statusCode = res.status;
        }

        const data = res.json();
        console.log("Lomito DELETED: ");
        console.log(data);

        loadFavorteLomitos();

    } catch (error) {
        console.error(error.message);
        sectionsContainer__spanError.innerText = `OOPS, Hubo un error :( , STATUS: ${statusCode}, MENSAJE: ${error.message}`; 
    }
}

const uploadLomitoPicture = async () => {

    try {

        const form = document.querySelector('#uploadingForm');
        const formData = new FormData(form);
    
        console.log(formData.get('file'));
    
        const res = await fetch(API_UPLOADS, {
            method: 'POST',
            headers: {
                //'Content-Type': 'multipart/form-data',
                'X-API-KEY': 'live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s',
            },
            body: formData,
        });

        if (res.status !== 200) {
            statusCode = res.status;
        }

        const data = await res.json();
        console.log('Lomito Uploaded! ');
        console.log(data);
        console.log('Data.url: ' + data.url);

        uploadSection__published_label.textContent = "Published !";
        
        saveFavoriteLomitos(data.id);
        loadFavorteLomitos();

    } catch (error) {
        sectionsContainer__spanError.innerText = `OOOPS! Hubo un error :( , STATUS: ${statusCode}, MESSAGE: ${error.message}`;
        console.error(error.message);
    }

}

// Event Listeners
const loadMoreBtn = document.querySelector("#loadMoreBtn");
loadMoreBtn.addEventListener("click", loadRandomLomitos);




// Funciones Invocadas al cargar la pagina por primera vez
loadRandomLomitos();
loadFavorteLomitos();

// Test for commit
