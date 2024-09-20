let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let indiceModificacion = -1; // Nueva variable global para saber qué gasto se está modificando


//Esta funcion se invoca al momento de que el usuario hace click en el boton
function clickBoton (){
    let nombregasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value;
    let descripcionGasto = document.getElementById("descripcionGasto").value;

    console.log(nombregasto);
    console.log(valorGasto);
    console.log(descripcionGasto);

//Convertir el valor del gasto a número para poder compararlo

    valorGasto = Number(valorGasto);

//Verificar si el gasto es mayor a 150 y mostrar alerta

    if(valorGasto > 150){
        alert("El gasto es mayor a 150 dólares");
    }

    if(indiceModificacion === -1){
        listaNombresGastos.push(nombregasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionGastos.push(descripcionGasto);
    } else {
        listaNombresGastos[indiceModificacion] = nombregasto;
        listaValoresGastos[indiceModificacion] = valorGasto;
        listaDescripcionGastos[indiceModificacion] = descripcionGasto;

        indiceModificacion = -1;

        document.getElementById("botonFormulario").textContent = "Agregar Gasto";
    }

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    console.log(listaDescripcionGastos);

    //alert("Click del usuario");
    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionGastos[posicion];

        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
                    <br>Descripción: ${descripcionGasto}
                    <button onclick="modificarGasto(${posicion});">Modificar</button>
                    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                    </li>`;

        //Calculamos el total de gastos
        totalGastos += Number(valorGasto);
    });
    
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar(){
    document.getElementById("nombreGasto").value = '';
    document.getElementById("valorGasto").value = '';
    document.getElementById("descripcionGasto").value = '';

    document.getElementById("botonFormulario").textContent = "Agregar Gasto";

    indiceModificacion = -1;
}

function eliminarGasto(posicion){
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    listaDescripcionGastos.splice(posicion,1);
    actualizarListaGastos();
}

function modificarGasto(posicion){
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("valorGasto").value = listaValoresGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionGastos[posicion];

    document.getElementById("botonFormulario").textContent = "Actualizar";

    indiceModificacion = posicion;
}