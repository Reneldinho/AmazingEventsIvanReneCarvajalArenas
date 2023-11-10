import { urlApi, pintarChecks, filtrarCategorias, crearCard, superFiltro } from "../modules/funciones.js";

fetch(urlApi).then(respuesta => respuesta.json()).then(data => {
  const arrayEvents = data.events
  for (let event of arrayEvents) {
    if (event.date >= "2023-01-22") {
      console.log(data);
      pintarChecks(arrayEvents)
      filtrarCategorias(arrayEvents)
      crearCard(arrayEvents)
      superFiltro(arrayEvents)
    }
  }
})