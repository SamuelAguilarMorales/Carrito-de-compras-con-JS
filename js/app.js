//variables

const carrito = document.querySelector('#carrito');
const contenerdorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando atras un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso del carrito
    contenerdorCarrito.addEventListener('click', eliminarCurso);
    //Eliminar curso del carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //Eliminarmos carrito
        limpiarHTML(); //Mostramos el carrito vacio
    });
}

//Funciones

function agregarCurso(e){
    if(e.target.classList.contains('agregar-carrito')){
        e.preventDefault();
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        //elimina del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML 

    }
}

// Lee el contenido del HTML al que damos clic y extrae informacion del curso

function leerDatosCurso(curso){
    //Creando un objeto con el contenido del curso actual.

   const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
   }; 

   //Revisa si un elemento ya existe en el carrito

   const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
   if(existe){
    //Actualizar cantidad
    const cursos = articulosCarrito.map(curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //Retorna el objeto actualizado 
        }else{
            return curso; //Retorna objetos no actualizados
        }
    })
    articulosCarrito = [...cursos]
   }else{
   //Agregar elementos al carrito

   articulosCarrito = [...articulosCarrito, infoCurso];
   console.log(articulosCarrito)
   }



   carritoHTML()
}

//Muestra carrito de compras en HTML

function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();


    //Recorrer cursos
    articulosCarrito.forEach( curso =>{
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
        <img src = ${curso.imagen} alt="Imagen del curso" width="100px";>
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        ${curso.cantidad}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>`;

        //Agrega HTML del carrito

        contenerdorCarrito.appendChild(row);

    })
}

function limpiarHTML(){
    //Forma Lenta
    //contenerdorCarrito.innerHTML = '';

    while(contenerdorCarrito.firstChild){
        contenerdorCarrito.removeChild(contenerdorCarrito.firstChild)
    }
}



//php

