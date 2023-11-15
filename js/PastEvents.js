import { urlApi, pintarChecks, filtrarCategorias, crearCard, superFiltro } from "../modules/funciones.js";

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    const arrayEvents = data.events;
    const currentDate = data.currentDate;

    const pastEvents = [];

    for (let event of arrayEvents) {
      if (Date.parse(event.date) < Date.parse(currentDate)) {
        pastEvents.push(event);
      }
    }

    pintarChecks(pastEvents)
    filtrarCategorias(pastEvents)
    crearCard(pastEvents, currentDate)
    superFiltro(pastEvents)
  });

