//PASOS PARA ARREGLAR EL CONTENIDO EN HTML DESDE JS:
//1. LE DOY UN ID AL CONTENEDOR EN EL ARCHIVO HTML QUE VOY A UTILIZAR
//2. LO GUARDO EN UNA VARIABLE EN EL NUEVO ARCHIVO QUE VOY A ALTERAR EN JS
//3. CREO UN NUEVO ELEMENTO EN ESE ARCHIVO DE JS Y LE PASO EL CONTENIDO
//4. APENDAR EL NUEVO ELEMENTO AL CONTENEDOR

export let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";


const contenedor = document.getElementById("ContenedorCards")
const contenedorCheckbox = document.getElementById("ContenedorCheckbox")
const buscador = document.getElementById("buscador")


//PINTAR CHECKBOX:
export function pintarChecks(arrayCategorys) {
    let categorys = []
    categorys = Array.from(new Set(arrayCategorys.map(evento => evento.category)))
    categorys.forEach(categoria => {
        let divCheckbox = document.createElement("div")
        divCheckbox.classList.add("form-check", "form-switch")
        divCheckbox.innerHTML = `
    <input class="form-check-input" type="checkbox" role="switch" id=${categoria} value="${categoria}">
    <label class="form-check-label" for=${categoria}>${categoria}</label>
    `;
        contenedorCheckbox.appendChild(divCheckbox)
    })
}


//FILTROS:
export function filtrarCategorias(arrayEvent) {
    let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map((checkbox) => checkbox.value);
    let eventosFiltrados = [];
    arrayEvent.forEach((event) => { checked.forEach((category) => { if (category == event.category) { eventosFiltrados.push(event); } }); });
    if (eventosFiltrados.length === 0) { return arrayEvent; } return eventosFiltrados;
}

function filtrarPorTexto(events) {
    return events.filter(event => event.name.toLowerCase().includes(buscador.value.toLowerCase()))
}

// CREAR CARDS
//PARA EVITAR QUE SE REPITAN LAS CARDS CUANDO SELECCIONO CHECKBOX, DEBO AGREGAR LA LINEA   contenedor.innerHTML = ""
export function crearCard(arrayEvent) {
    contenedor.innerHTML = "";
    if (arrayEvent.length == 0) {
        contenedor.innerHTML = "<h2>EVENTO NO ENCONTRADO</h2>"
    } else {
        contenedor.innerHTML = "";
        for (let event of arrayEvent) {
            const card = document.createElement("div")
            card.classList.add("card")
            card.style.width = "18rem"
            card.innerHTML = `<div class="eventCards card d-flex g-4">
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


// ESCUCHAR EVENTO DE SELECCIONAR CHECKBOX:
contenedorCheckbox.addEventListener('change', () => filtrarCategorias(arrayEvent))
contenedorCheckbox.addEventListener('change', function () {
    let filtro = filtrarCategorias(arrayEvent)
    crearCard(filtro)
})


export function superFiltro(arrayEvent) {
    let filtro1 = filtrarCategorias(arrayEvent)
    let filtro2 = filtrarPorTexto(filtro1)
    
    //ESCUCHADOR DE EVENTOS
    contenedorCheckbox.addEventListener('change', () => {
        superFiltro(arrayEvent)
    })

    buscador.addEventListener("keyup", () => {
        superFiltro(arrayEvent)
    })
    crearCard(filtro2)
}

