//PASOS PARA ARREGLAR EL CONTENIDO EN HTML DESDE JS:
//1. LE DOY UN ID AL CONTENEDOR EN EL ARCHIVO HTML QUE VOY A UTILIZAR
//2. LO GUARDO EN UNA VARIABLE EN EL NUEVO ARCHIVO QUE VOY A ALTERAR EN JS
//3. CREO UN NUEVO ELEMENTO EN ESE ARCHIVO DE JS Y LE PASO EL CONTENIDO
//4. APENDAR EL NUEVO ELEMENTO AL CONTENEDOR

const ArrayEvents = data.events
const contenedor = document.getElementById("ContenedorCards")
const ContenedorCheckbox = document.getElementById("ContenedorCheckbox")
const buscador = document.getElementById("buscador")
let Categorys = []

//PARA QUE ME FUNCIONE EL FILTRO VOY A ANEXAR UN .replace(" ", "-") DESPUES DE event.category
Categorys = Array.from(new Set(ArrayEvents.map(event => event.category.replace(" ", "-"))))
console.log(Categorys);

// PARA QUE ME QUEDE MAS BONITO EL FILTRO: EN EL ${Category} LE AGREGO UN .replace("-", "")
function PintarCheckbox(ArrayCategorys) {
  ArrayCategorys.forEach(Category => {
    const checkbox = document.createElement("div")
    checkbox.classList.add("form-check", "form-switch")
    checkbox.innerHTML = `
    <div class="form-check form-switch">
<input class="form-check-input" type="checkbox" id=${Category} value=${Category}">
<label class="form-check-label" for=${Category}=>${Category.replace("-", "")}</label>
</div>
    `
    ContenedorCheckbox.appendChild(checkbox)
  });
}

PintarCheckbox(Categorys)

//AQUI VAMOS CON LOS FILTROS: TRAEMOS DE TODOS LOS INPUT TIPO CHECKBOX QUE ESTAN CHEQUEADOS
//LUEGO EN let checked, LE ANTEPONGO A document, UN Array.from(), PARA LUEGO AL FINAL PODER HACER UNA FUNCION DE ORDEN SUPERIOR .map((checkbox => checkbox.value)), Y ASI PODER CREAR UN NUEVO ARRAY CON LOS CHEQUEADOS

ContenedorCheckbox.addEventListener('change', () => FiltrarCategorys(ArrayEvents))

function FiltrarCategorys(ArrayCategorias) {
  let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox => checkbox.value))
  console.log(checked)
  let EventsFiltrados = []

  ArrayCategorias.forEach(EventoSeleccionado => {
    checked.forEach(EventoCategoria => {
      if (EventoCategoria == EventoSeleccionado.category.replace("-", "")) {
        EventsFiltrados.push(EventoSeleccionado)
      }
    })
  })
  if (EventsFiltrados.length == 0) {
    EventsFiltrados.push(ArrayCategorias)
  }
  return EventsFiltrados
}



// for (let event of ArrayEvents) {
//   const card = document.createElement("div")
//   card.classList.add("card")
//   card.style.width = "18rem"
//   card.innerHTML = `<div class="card" style="width: 18rem;">
//   <img class="card-img-top ImagenCards" src="${event.image}" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">${event.name}</h5>
//     <p class="card-text">DATE: ${event.date} <br>DESCRIPTION: ${event.description} <br>CATEGORY: ${event.category} <br>PLACE: ${event.place}<br>CAPACITY: ${event.capacity} <br>ASSISTANCE: ${event.assistance}<br>PRICE: ${event.price}</p>

//     <a href="#" class="btn btn-primary">DETAILS</a>
//   </div>
//   </div>`
//   contenedor.appendChild(card)
// }


function crearCard(ArrayEvents) {
  if (ArrayEvents.length == 0) {
    contenedor.innerHTML = "<h2>PERSONA NO ENCONTRADA</h2>"
  } else {
    contenedor.innerHTML = "";
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
  }
}

crearCard(ArrayEvents)

//ESCUCHADOR DE EVENTOS


function SuperFiltro(ArrayEvents) {
  let filtro1 = FiltrarCategorys(ArrayEvents)
  let filtro2 = FiltrarPorTexto(filtro1)
  crearCard(filtro2)
}

ContenedorCheckbox.addEventListener('change',()=>{
SuperFiltro(ArrayEvents)
})

buscador.addEventListener("keyup", ()=>{
SuperFiltro(ArrayEvents)
})