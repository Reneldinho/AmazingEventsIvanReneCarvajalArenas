import { urlApi, pintarChecks, filtrarCategorias, crearCard, superFiltro } from "../modules/funciones.js";

fetch(urlApi)
  .then((res) => res.json())
  .then((data) => {
    const arrayEvents = data.events;
    const currentDate = data.currentDate;

    const arrayUpcomingEvents = [];

    for (let event of arrayEvents) {
      if (Date.parse(event.date) > Date.parse(currentDate)) {
        arrayUpcomingEvents.push(event);
      }
    }

    pintarChecks(arrayUpcomingEvents)
    filtrarCategorias(arrayUpcomingEvents)
    crearCard(arrayUpcomingEvents, currentDate)
    superFiltro(arrayUpcomingEvents)
  });

