//PASOS PARA ARREGLAR EL CONTENIDO EN HTML DESDE JS:
//1. LE DOY UN ID AL CONTENEDOR EN EL ARCHIVO HTML QUE VOY A UTILIZAR
//2. LO GUARDO EN UNA VARIABLE EN EL NUEVO ARCHIVO QUE VOY A ALTERAR EN JS
//3. CREO UN NUEVO ELEMENTO EN ESE ARCHIVO DE JS Y LE PASO EL CONTENIDO
//4. APENDAR EL NUEVO ELEMENTO AL CONTENEDOR


const ArrayEvents = data.events
const ContenedorCheckBox = document.getElementById("ContenedorCheckBox")
const contenedor = document.getElementById("ContenedorCards")
let Countrys = []

{/* <div class="card" style="width: 18rem;">
<img class="card-img-top" src="./Recursos_Amazing_Events_Task_1/books.jpg" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">LIBRARY</h5>
  <p class="card-text">CAPACITY: THOUSAND PEOPLE <br>DATE: 10/12/2023 <br>PRICE = $25</p>
  <a href="#" class="btn btn-primary">DETAILS</a>
</div>
</div> */}

// let Telefono = 3162658967 y donde esta <p> pondria: <p class="card-text">CAPACITY: THOUSAND PEOPLE <br>DATE: 10/12/2023 <br>PRICE = $25 <br>Phone: ${Telefono}</p>. DE ESTA FORMA EM TOMARIA LA VARIABLE CREADA COMO TELEFONO




for (let event of ArrayEvents) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.style.width = "18rem"
    card.innerHTML = `<div class="card" style="width: 18rem;">
    <img class="card-img-top ImagenCards" src="${event.image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">DATE: ${event.date} <br>DESCRIPTION: ${event.description} <br>CATEGORY: ${event.category} <br>PLACE: ${event.place}<br>CAPACITY: ${event.capacity} <br>ASSISTANCE: ${event.assistance}<br>PRICE: ${event.price}</p>

      <a href="#" class="btn btn-primary">DETAILS</a>
    </div>
    </div>`
    contenedor.appendChild(card)
}


// contenedor.appendChild(card)
// for (let event of ArrayEvents) {
//     console.table(`DATE ES: ${event.date}`)
// }

// let titulo = document.createElement("h1")
// titulo.innerHTML = "ESTE ES NUESTRO TITULO"
// contenedor.appendChild(titulo)