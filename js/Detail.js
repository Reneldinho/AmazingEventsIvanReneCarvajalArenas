const UrlParams = new URLSearchParams(Window.location.search)
const id = UrlParams.get("id")

const personas = data.usuarios

let EventoEncontrado = eventos.find(evento => evento.id == id)
const contenedorDetails = document.getElementById("contenedorDetails")

function CrearCard(ArrayEvents) {
    for (let event of ArrayEvents) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.style.width = "18rem"
        card.innerHTML = `<div class="card" style="width: 18rem;">
      <img class="card-img-top ImagenCards" src="${event.image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${ArrayEvents.name}</h5>
        <p class="card-text">DATE: ${ArrayEvents.date} <br>DESCRIPTION: ${ArrayEvents.description} <br>CATEGORY: ${ArrayEvents.category} <br>PLACE: ${ArrayEvents.place}<br>CAPACITY: ${ArrayEvents.capacity} <br>ASSISTANCE: ${ArrayEvents.assistance}<br>PRICE: ${ArrayEvents.price}</p>
  
        <a href="#" class="btn btn-primary">DETAILS</a>
      </div>`
        contenedor.appendChild(card)
    }
}

CrearCard(EventoEncontrado)