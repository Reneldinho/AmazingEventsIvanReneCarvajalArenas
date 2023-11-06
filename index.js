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
Categorys = Array.from(new Set(ArrayEvents.map(evento => evento.category.replace(" ", "-"))))


//PINTAR CHECKBOX:
function PintarChecks(ArrayCategorys) {
  ArrayCategorys.forEach(categoria => {
    let divCheckbox = document.createElement("div")
    divCheckbox.classList.add("form-check", "form-switch")
    divCheckbox.innerHTML = `
  <input class="form-check-input" type="checkbox" role="switch" id=${categoria} value=${categoria}>
  <label class="form-check-label" for=${categoria}>${categoria.replace("-", " ")}</label>
  `;
    ContenedorCheckbox.appendChild(divCheckbox)
  })
}
PintarChecks(Categorys)

//ESCUCHAR EVENTO DE SELECCIONAR CHECKBOX:
// ContenedorCheckbox.addEventListener('change',()=> filtrarCategorias(ArrayEvents))


//FILTROS:
function filtrarCategorias(arrayEventos) {
  let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value)
  console.log(checked);
  let eventosFiltrados = []
  //POR CADA evento QUE TENGA EL arrayEventos, VAMOS A RECORRER EL ARRAY DE checked EN DONDE TENEMOS LOS EVENTOS QUE SELECCIONO EL USUARIO; Y POR CADA evento QUE ESTE POR DENTRO DE checked, SI CADA evento SELECCIONADO POR EL USUARIO ES IGUAL AL EVENTO QUE TIENE EL forEach DESPUES DEL arrayEventos, ME LO COLOQUE EN eventosFiltrados
  arrayEventos.forEach(evento => {
    checked.forEach(eventocheckeado => {
      if (evento == eventocheckeado.replace(" "), ("-")) {
        eventosFiltrados.push(evento)
      }
    })
  })
  if (eventosFiltrados.length == 0) {
    eventosFiltrados.push(arrayEventos)
  }
  return eventosFiltrados
}

{/* <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
  </div> */}

// filtrarCategorias(ArrayEvents)

// //PARA QUE ME FUNCIONE EL FILTRO VOY A ANEXAR UN .replace(" ", "-") DESPUES DE event.category
// Categorys = Array.from(new Set(ArrayEvents.map(event => event.category.replace(" ", "-"))))
// console.log(Categorys);

// // PARA QUE ME QUEDE MAS BONITO EL FILTRO: EN EL ${Category} LE AGREGO UN .replace("-", "")
// function PintarCheckbox(ArrayCategorys) {
//   ArrayCategorys.forEach(Category => {
//     const checkbox = document.createElement("div")
//     checkbox.classList.add("form-check", "form-switch")
//     checkbox.innerHTML = `
//     <div class="form-check form-switch">
// <input class="form-check-input" type="checkbox" id=${Category} value=${Category}">
// <label class="form-check-label" for=${Category}=>${Category}</label>
// </div>
//     `
//     ContenedorCheckbox.appendChild(checkbox)
//   });
// }

// PintarCheckbox(Categorys)

// //AQUI VAMOS CON LOS FILTROS: TRAEMOS DE TODOS LOS INPUT TIPO CHECKBOX QUE ESTAN CHEQUEADOS
// //LUEGO EN let checked, LE ANTEPONGO A document, UN Array.from(), PARA LUEGO AL FINAL PODER HACER UNA FUNCION DE ORDEN SUPERIOR .map((checkbox => checkbox.value)), Y ASI PODER CREAR UN NUEVO ARRAY CON LOS CHEQUEADOS

// // ContenedorCheckbox.addEventListener('change', () => FiltrarCategorys(ArrayEvents))

// function FiltrarCategorys(ArrayCategorias) {
//   let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((checkbox => checkbox.value))
//   console.log(checked)
//   let EventsFiltrados = []

//   ArrayCategorias.forEach(EventoSeleccionado => {
//     checked.forEach(EventoCategoria => {
//       if (EventoCategoria == EventoSeleccionado.category.replace("-", "")) {
//         EventsFiltrados.push(EventoSeleccionado)
//       }
//     })
//   })
//   if (EventsFiltrados.length == 0) {
//     EventsFiltrados.push(ArrayCategorias)
//   }
//   return EventsFiltrados
// }



// // for (let event of ArrayEvents) {
// //   const card = document.createElement("div")
// //   card.classList.add("card")
// //   card.style.width = "18rem"
// //   card.innerHTML = `<div class="card" style="width: 18rem;">
// //   <img class="card-img-top ImagenCards" src="${event.image}" alt="Card image cap">
// //   <div class="card-body">
// //     <h5 class="card-title">${event.name}</h5>
// //     <p class="card-text">DATE: ${event.date} <br>DESCRIPTION: ${event.description} <br>CATEGORY: ${event.category} <br>PLACE: ${event.place}<br>CAPACITY: ${event.capacity} <br>ASSISTANCE: ${event.assistance}<br>PRICE: ${event.price}</p>

// //     <a href="#" class="btn btn-primary">DETAILS</a>
// //   </div>
// //   </div>`
// //   contenedor.appendChild(card)
// // }


//PARA EVITAR QUE SE REPITAN LAS CARDS CUANDO SELECCIONO CHECKBOX, DEBO AGREGAR LA LINEA   contenedor.innerHTML = ""
function crearCard(ArrayEvents) {

  if (ArrayEvents.length == 0) {
    contenedor.innerHTML = "<h2>PERSONA NO ENCONTRADA</h2>"
  } else {
    contenedor.innerHTML = ""
    console.log(contenedor);
    for (let event of ArrayEvents) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.innerHTML = `<div class="card" style="width: 18rem;">
  <img class="card-img-top ImagenCards" src="${event.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">DATE: ${event.date} <br>DESCRIPTION: ${event.description} <br>CATEGORY: ${event.category} <br>PLACE: ${event.place}<br>CAPACITY: ${event.capacity} <br>ASSISTANCE: ${event.assistance}<br>PRICE: ${event.price}</p>

    <a href="#" class="btn btn-primary">DETAILS</a>
  </div>
  </div>`;
      contenedor.appendChild(card);
    }
  }
}

crearCard(ArrayEvents)

ContenedorCheckbox.addEventListener('change', function () {
  let filtro = filtrarCategorias(ArrayEvents)
  console.log(filtro);
  crearCard(filtro)
})


// function FiltrarPorTexto(events) {
//   return events.filter(events=>events.name.toLowerCase().includes(search.value.toLowerCase()))
// }

// //ESCUCHADOR DE EVENTOS


// function SuperFiltro(eventos) {
//   let filtro1 = FiltrarCategorys(eventos)
//   let filtro2 = FiltrarPorTexto(filtro1)
//   crearCard(filtro2)
// }

// ContenedorCheckbox.addEventListener('change',()=>{
// SuperFiltro(ArrayEvents)
// })

// buscador.addEventListener("keyup", ()=>{
// SuperFiltro(ArrayEvents)
// })