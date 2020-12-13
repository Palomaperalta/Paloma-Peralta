const continentes = ['America', 'Europa', 'Africa', 'Asia', 'Oceania'];

let filasCreadas = -1;
let edicion = false;
let filtrado = false;
let idEdicion;
let maresOriginales = [];

fillContinentes();

function fillContinentes(){

    continentes.forEach(continente => {
        const optionEl = document.createElement('option');
        optionEl.value = continente;
        optionEl.innerText = continente;
        inputContinentesEl.appendChild(optionEl);
        selectFilterEl.appendChild(optionEl);
    });

    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('selected', 'selected');
    defaultOption.innerText = 'Seleccionar continente';
    defaultOption.value = '0';
    selectFilterEl.appendChild(defaultOption);
}

formMaresEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
	hideProgressBar.classList.remove('display-none');

	let timerId, percent;

	// reset progress bar
	percent = 0;
	
	enviarEl.disabled = true;
	loadEl.classList.add('progress-bar-striped');
	loadEl.classList.add('active');


	timerId = setInterval(function() {

		// increment progress bar
		percent += 10;
		loadEl.style.width = percent + '%';
		loadEl.innerHTML = percent + '%';

		// complete
		if (percent >= 100) {
			clearInterval(timerId);
			enviarEl.disabled = false;
			loadEl.classList.remove('progress-bar-striped');
			loadEl.classList.remove('active');
			loadEl.innerHTML = '100%';

			if (!edicion) {
				addMar(inputContinentesEl.value, inputMaresEl.value);
			} else {
				if (idEdicion) {
					editMar();
				}
			}
			clearInputs();
			$('#modal-mares').modal('hide');
		}

	}, 200);
})

function addMar(continente, mar){
    const itemEl = createMarItem(continente, mar);
    tablaMarEl.appendChild(itemEl);
}

function editMar() {
    const element = document.getElementById(idEdicion);
    const parent = element.parentElement;
    const children = parent.parentElement.children;
    children[0].innerText = inputMaresEl.value;
    children[1].innerText = inputContinentesEl.value;
    let idMar = idEdicion.split('-')[2];
    let indiceAEditar = maresOriginales.findIndex(mar => mar.id == idMar);
    maresOriginales[indiceAEditar].nombre = inputMaresEl.value;
    maresOriginales[indiceAEditar].continente = inputContinentesEl.value;
}

function createMarItem(continente, mar){
    const tableRow = document.createElement('tr');
    const columnaContinente = document.createElement('td');
    const columnaMar = document.createElement('td');
    filasCreadas++;
    if (!filtrado) {
        maresOriginales.push({id: filasCreadas, nombre: mar, continente: continente});
    }
    tableRow.setAttribute('id', filasCreadas);
    columnaContinente.innerText = continente;
    columnaMar.innerText = mar;
    tableRow.appendChild(columnaMar);
    tableRow.appendChild(columnaContinente);
    const acciones = agregarAcciones(continente, mar, filasCreadas);
    tableRow.appendChild(acciones);
    return tableRow;
}

function agregarAcciones(continente, mar, id) {
    const acciones = document.createElement('td');
    const botonEliminar = document.createElement('button');
    const botonEditar = document.createElement('button');


    const eliminarId = 'boton-eliminar-' + id;
    botonEliminar.innerHTML = 'Eliminar';
    botonEliminar.setAttribute('id', eliminarId);
    botonEliminar.setAttribute('class', 'btn btn-danger');

    const edicionId = 'boton-editar-' + id;
    botonEditar.innerHTML = 'Editar';
    botonEditar.setAttribute('id', edicionId);
    botonEditar.setAttribute('class', 'btn btn-primary');

    acciones.appendChild(botonEditar);
    acciones.appendChild(botonEliminar);

    botonEditar.addEventListener('click', (ev) => {
        ev.preventDefault();
        edicion = true;
        idEdicion = edicionId;
        const selectedRow = document.getElementById(id);
        const children = selectedRow.children;
        inputMaresEl.value = children[0].innerText;
        inputContinentesEl.value = children[1].innerText;
		resetearProgressBar();
        $('#modal-mares').modal();
    })

    botonEliminar.addEventListener('click', (ev) => {
        ev.preventDefault();
        const element = document.getElementById(id);
        element.remove();
        maresOriginales.splice(maresOriginales.findIndex(m => m.id == id), 1);
    })

    return acciones;
}

function clearInputs(){
    edicion = false;
    idEdicion = undefined;
    inputMaresEl.value = '';
    inputContinentesEl.value = continentes[0];
}

function resetearProgressBar() {
	hideProgressBar.classList.add('display-none');
	loadEl.innerHTML = '0%';
	loadEl.style.width= '0%';
}

botonAgregarMar.addEventListener('click', (ev) => {
    ev.preventDefault();
	resetearProgressBar();
    $('#modal-mares').modal();
})

cancelarEl.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearInputs();
    $('#modal-mares').modal('hide');
})

let createHeader = () => {
    let theadEl = document.createElement("thead");
    let trEl = document.createElement("tr");

	let thElNames = document.createElement("th");
	let thElContinents = document.createElement("th");
	let thElActions = document.createElement("th");

	thElNames.innerHTML = "Nombre del Mar";
	thElContinents.innerHTML = "Continente";
	thElActions.innerHTML = "Acciones";

	trEl.appendChild(thElNames);
	trEl.appendChild(thElContinents);
	trEl.appendChild(thElActions);
   
    theadEl.appendChild(trEl);
    tablaMarEl.appendChild(theadEl);
}

let createBody = (arregloMares) => {
	arregloMares.forEach(mar => {
		let nuevoMar = createMarItem(mar.continente, mar.nombre);
		tablaMarEl.appendChild(nuevoMar);
	})
}

window.addEventListener("load", () => {
  createHeader();
  createBody(dataParseada.mares);
});

buttonFilterEl.addEventListener('click', (ev) => {
    ev.preventDefault();
    filtrado = true;
    const continenteAFiltrar = selectFilterEl.value;

    const maresFiltrados = maresOriginales.filter(mar => mar.continente == continenteAFiltrar);

    let tableRows = [...tablaMarEl.children];
    tableRows.shift();
    tableRows.forEach(e => e.remove());

    if (continenteAFiltrar != 0) {
        createBody(maresFiltrados);
    } else {
        createBody(maresOriginales);
    }

    filtrado = false;
})



































