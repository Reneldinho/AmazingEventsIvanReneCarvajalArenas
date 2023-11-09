import { urlApi, pintarChecks, filtrarCategorias, crearCard, superFiltro } from "../modules/funciones.js";

fetch(urlApi).then(respuesta => respuesta.json()).then(data => {
  console.log(data);
  const arrayEvents = data.events
  pintarChecks(arrayEvents)
  filtrarCategorias(arrayEvents)
  crearCard(arrayEvents)
  superFiltro(arrayEvents)
})