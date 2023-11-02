//PASOS PARA ARREGLAR EL CONTENIDO EN HTML DESDE JS:
//1. LE DOY UN ID AL CONTENEDOR EN EL ARCHIVO HTML QUE VOY A UTILIZAR
//2. LO GUARDO EN UNA VARIABLE EN EL NUEVO ARCHIVO QUE VOY A ALTERAR EN JS
//3. CREO UN NUEVO ELEMENTO EN ESE ARCHIVO DE JS Y LE PASO EL CONTENIDO
//4. APENDAR EL NUEVO ELEMENTO AL CONTENEDOR

const ArrayEvents = data.events
const contenedor = document.getElementById("ContenedorCards")
const ContenedorCheckbox = document.getElementById("ContenedorCheckbox")
let Categorys = []
Categorys = Array.from(new Set(ArrayEvents.map(event => event.category)))
console.log(Categorys);


function PintarCheckbox(ArrayCategorys) {
  ArrayCategorys.forEach(Category => {
    const checkbox = document.createElement("div")
    checkbox.classList.add("form-check", "form-switch")
    checkbox.innerHTML = `
    <div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
<label class="form-check-label" for="flexSwitchCheckDefault">${Category}</label>
</div>
    `
    ContenedorCheckbox.appendChild(checkbox)
  });
}

PintarCheckbox(Categorys)




for (let event of ArrayEvents) {
    if(event.date < "2023-01-22"){
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
}