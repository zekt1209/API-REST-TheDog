console.log("Hello World");

const api_key =
    "live_J3iggKLJBobNvVInly0u18H5QJVreUL65aiMy5RZH5B0HQZ49TB0wDZP2BvG0Y4s";
const API_RANDOM = `https://api.thedogapi.com/v1/images/search?limit=3&api_key=`;
const API_FAVORITES = "https://api.thedogapi.com/v1/favourites";

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");

const loadMoreBtn = document.querySelector("#loadMoreBtn");
const saveLomito1 = document.querySelector("#saveLomito1");

const spanError = document.querySelector("#spanError");

// Llamamos a fetch(Nuestra API), lo guardamos en "res" y lo parseamos a json, y lo guardamos en "data"
// Le asignamos la URL de las imagenes que nos trajo la API a nuestras imagenes del HTML.
const loadRandomLomitos = async () => {
    const res = await fetch(`${API_RANDOM}${api_key}`);
    const data = await res.json();

    console.log("Random Lomitos");
    console.log(data);

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
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
    } catch (error) {
        console.error("VGG - Favorites error: " + error.message);
        spanError.innerText =
            "OOOPS! hubo un error :( , STATUS: " +
            statusCode +
            ", message: " +
            error.message;
    }
};

const saveFavoriteLomitos = async () => {
    try {
        const res = await fetch(`${API_FAVORITES}?api_key=${api_key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_id: "E0iEH4Nof",
            }),
        });

        if (res.status !== 200) {
            statusCode = res.status;
        }

        const data = await res.json();
        console.log("Lomito saved: ");
        console.log(data);
    } catch (error) {
        console.error("VGG - Save Favorites Error: " + error.message);
        spanError.innerText =
            "OOOPS! Hubo un error! :( , STATUS: " +
            statusCode +
            ", MESSAGE: " +
            error.message;
    }
};

// Event Listeners
loadMoreBtn.addEventListener("click", loadRandomLomitos);
saveLomito1.addEventListener("click", saveFavoriteLomitos);

// Funciones Invocadas al cargar la pagina por primera vez
loadRandomLomitos();
loadFavorteLomitos();
