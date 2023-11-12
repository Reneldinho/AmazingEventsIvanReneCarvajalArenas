import { urlApi, crearTablas } from "../modules/funciones.js";
fetch(urlApi).then(repuesta => repuesta.json()).then(data => {
    const arrayEvents = data.events
    crearTablas(arrayEvents, data)
})