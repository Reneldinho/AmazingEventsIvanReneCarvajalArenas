import { urlApi, pintarChecks, filtrarCategorias, crearCard, superFiltro } from "../modules/funciones.js";

fetch(urlApi).then(respuesta => respuesta.json()).then(data => {
  console.log(data);
  const arrayEvents = data.events
  const fecha = data.currentDate
  let arrayPastEvents = []
  for (let event of arrayEvents) {
    if (Date.parse(event.date) < Date.parse(fecha)) {
      arrayPastEvents.push(event)
    }
    }
    pintarChecks(arrayPastEvents)
    filtrarCategorias(arrayPastEvents)
    crearCard(arrayPastEvents, fecha)
    superFiltro(arrayPastEvents)
})