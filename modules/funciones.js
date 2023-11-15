//PASOS PARA ARREGLAR EL CONTENIDO EN HTML DESDE JS:
//1. LE DOY UN ID AL CONTENEDOR EN EL ARCHIVO HTML QUE VOY A UTILIZAR
//2. LO GUARDO EN UNA VARIABLE EN EL NUEVO ARCHIVO QUE VOY A ALTERAR EN JS
//3. CREO UN NUEVO ELEMENTO EN ESE ARCHIVO DE JS Y LE PASO EL CONTENIDO
//4. APENDAR EL NUEVO ELEMENTO AL CONTENEDOR

export let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";


const contenedor = document.getElementById("ContenedorCards")
const contenedorCheckbox = document.getElementById("ContenedorCheckbox")
const buscador = document.getElementById("buscador")
const tabla1 = document.getElementById("tabla1")
const tabla2 = document.getElementById("tabla2")
const tabla3 = document.getElementById("tabla3")

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

export function filtrarPorTexto(arrayEvent) {
    return arrayEvent.filter((event) =>
        event.name.toLowerCase().includes(buscador.value.toLowerCase())
    );
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

export function superFiltro(arrayEvent) {
    let filtro1 = filtrarPorTexto(arrayEvent)
    let filtro2 = filtrarCategorias(filtro1)

    //ESCUCHADOR DE EVENTOS
    contenedorCheckbox.addEventListener('change', () => {
        superFiltro(arrayEvent)
    })

    buscador.addEventListener("keyup", () => {
        superFiltro(arrayEvent)
    })
    crearCard(filtro2)
}


//TRABAJANDO LAS TABLAS
export function crearTablas(arrayEvent, data) {
    const estadisticaEventos = arrayEvent.filter(evento => Date.parse(data.currentDate) > Date.parse(evento.date))
    //TABLA1
    let arrayClasificado = estadisticaEventos.sort((a, b) => b.assistance / b.capacity - a.assistance / a.capacity)
    let eventoMayorAsistencia = arrayClasificado[0]
    let eventoMenorAsistencia = arrayClasificado[arrayClasificado.length - 1]
    let arrayCapacidad = arrayClasificado.sort((a, b) => b.capacity - a.capacity)
    let eventoMayorCapacidad = arrayCapacidad[0]
    let tr = document.createElement("tr")
    tr.innerHTML = `      <td>${eventoMayorAsistencia.name}</td>
<td>${eventoMenorAsistencia.name}</td>
<td>${eventoMayorCapacidad.name}</td>
`
    tabla1.appendChild(tr)


    //TABLA2
    const arrayEventosFuturos = [];

    for (let event of arrayEvent) {
      if (Date.parse(event.date) > Date.parse(data.currentDate)) {
        arrayEventosFuturos.push(event);
      }
    }
  
    const categoriasEventosFuturos = arrayEventosFuturos.map((event) => event.category);
  
    const arrayCategoriasEventosFuturos = categoriasEventosFuturos.filter(
      (value, index) => categoriasEventosFuturos.indexOf(value) === index
    );
  
    arrayCategoriasEventosFuturos.forEach((category) => {
      let eventosFiltrados = arrayEventosFuturos.filter(
        (event) => event.category === category
      );
  
      let gananciasEventosFuturos = eventosFiltrados
        .map((event) => event.estimate * event.price)
        .reduce((a, b) => a + b, 0);
  
      let porcentajeEventosFuturos =
        eventosFiltrados
          .map((event) => (event.estimate / event.capacity) * 100)
          .reduce((a, b) => a + b, 0) / eventosFiltrados.length;
  
      let tr = document.createElement("tr");
      tr.innerHTML = `
          <td>${category}</td>
          <td>$ ${gananciasEventosFuturos.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}</td>
          <td>${porcentajeEventosFuturos.toFixed(2)}%</td>
          `;
      tabla2.appendChild(tr);
    });



//     //TABLA 3
const arrayEventosPasados = [];

for (let event of arrayEvent) {
  if (Date.parse(event.date) < Date.parse(data.currentDate)) {
    arrayEventosPasados.push(event);
  }
}
console.log(arrayEventosPasados);
    const categoriasPasadas = arrayEventosPasados.map(evento => evento.category);
    const arrayCategoriasPasadas = categoriasPasadas.filter((valor, indice) => categoriasPasadas.indexOf(valor) === indice);


    arrayCategoriasPasadas.forEach(category => {
        let filtradorEventos = arrayEventosPasados.filter(evento => evento.category == category);
        let Ganancias = filtradorEventos.map(evento => evento.assistance * evento.price).reduce((a, b) => a + b, 0)
        console.log(Ganancias);
           let porcentajes = filtradorEventos.map(evento => (evento.assistance / evento.capacity) * 100).reduce((a, b) => a + b, 0) / filtradorEventos.length
        

        let tr = document.createElement("tr");
        tr.className = "table-primary", "align-items-center";
        tr.innerHTML = `<td>${category}</td>
                      <td>$${Ganancias}</td>
                      <td>${porcentajes.toFixed(2)}%</td>`;
        tabla3.appendChild(tr);

    });
}