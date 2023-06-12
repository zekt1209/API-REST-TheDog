const api_key = "live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s";

const api_axios = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {'X-API-KEY': `${api_key}`}
});

const API_RANDOM = `https://api.thedogapi.com/v1/images/search`;
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites";
const API_UPLOADS = "https://api.thedogapi.com/v1/images/upload";

const spanError = document.querySelector("#spanError");

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
        
        // We used event Handlers because eventListeners were having issues at the moment to excecute them multiple times, they were saving the olv value and bringind it in future requests
        btnSaveLomito1.onclick = () => saveFavoriteLomitos(data[0].id);
        btnSaveLomito2.onclick = () => saveFavoriteLomitos(data[1].id);
        btnSaveLomito3.onclick = () => saveFavoriteLomitos(data[2].id);

    } catch (error) {
        console.error("VGG - Random Error: " + error.message);
        spanError.innerText = "OOOPS! hubo un error :( , STATUS: " + statusCode + ", MENSAJE: " + error.message;
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
            const btnDeleteFromFavText = document.createTextNode('Eliminar de Favoritos');
            btn.appendChild(btnDeleteFromFavText);

            // Crear evento para cada boton que pertenece a una card del lomito seleccionado y le mandamos su image ID
            btn.addEventListener('click', () => deleteFavoriteLomito(element.id));

            img.classList.add("lomito-image");
            img.alt = "lomito-picture";
            img.src = element.image.url;

            article.appendChild(img);
            article.appendChild(btn);

            lomitosContainer.appendChild(article);
        }


    } catch (error) {
        console.error("VGG - Favorites error: " + error.message);
        spanError.innerText =
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
        spanError.innerText =
            "OOOPS! Hubo un error! :( , STATUS: " +
            statusCode +
            ", MESSAGE: " +
            error.message;
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
        spanError.innerText = `OOPS, Hubo un error :( , STATUS: ${statusCode}, MENSAJE: ${error.message}`; 
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
    
        saveFavoriteLomitos(data.id);
        loadFavorteLomitos();

    } catch (error) {
        spanError.innerText = `OOOPS! Hubo un error :( , STATUS: ${statusCode}, MESSAGE: ${error.message}`;
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
