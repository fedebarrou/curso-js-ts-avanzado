/*Requisitos de finalización
Desestructuración de Objetos:

a. Crea un objeto llamado persona que contenga información sobre una persona, como su nombre, edad, dirección, y correo electrónico.

b. Utiliza la desestructuración de objetos para extraer la información de persona y mostrarla en la consola de forma separada (nombre, edad, dirección, correo electrónico).

*/


class Persona {

  constructor(nombre, edad, direccion, correo_electronico) {

    this.nombre = nombre;
    this.edad = edad;
    this.direccion = direccion;
    this.correo_electronico = correo_electronico;

  }


}

const persona1 = new Persona("Fede", 35, "Lanús", "fede@mail.com");

const { nombre, edad, direccion, correo_electronico } = persona1;


console.log(nombre);
console.log(edad);
console.log(direccion);
console.log(correo_electronico);





/*Consumo de una API:

a. Utiliza la API pública de JSONPlaceholder que proporciona datos ficticios para practicar. En particular, vamos a utilizar la ruta /todos que proporciona una lista de tareas.

b. Utiliza la función fetch para hacer una solicitud GET a la URL https://jsonplaceholder.typicode.com/todos.

c. Maneja la promesa resultante y convierte la respuesta en formato JSON.

d. Utiliza la desestructuración para extraer un objeto de tarea (cualquier tarea) de la lista de tareas obtenida.

e. Muestra en la consola la información de la tarea desestructurada, que generalmente incluye userId, id, title, y completed.

*/


async function obtenerDatosAwait() {

  try {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) throw new Error(`HTTP ${response.status}`); //PARA DETECTAR QUE ErROR ES

    const data = await response.json();

    const [tarea1, tarea2, tarea3] = data //USO CORCHETES PORQUE ESTO DESESTURCUTRANDO UNA LISTA

    console.log(tarea1)
    console.log(tarea1?.title)
    mostrarTarea(tarea3)

  } catch (error) {
    console.error("Ocurrió un error:", error.message);
  } finally {
    console.log("Bloque finalizado");
  }


}

//obtenerDatosAwait()


function obtenerDatosThen() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => {
      const [tarea1, tarea2, tarea3] = data;

      console.log(tarea2);
      console.log(tarea2.title);
      mostrarTarea(tarea3)
    })
    .catch(error => {
      console.error("Ocurrió un error:", error.message);
    })
    .finally(() => {
      console.log("Bloque finalizado");
    });
}


obtenerDatosThen();




/*Aplicación de Datos de la API:

a. Crea una función llamada mostrarTarea que tome un objeto de tarea como parámetro y muestre la información de la tarea en el formato deseado (por ejemplo, "Tarea: [title], ID: [id], Completada: [completed]").

b. Llama a la función mostrarTarea pasando el objeto de tarea obtenido de la API como argumento.*/

function mostrarTarea(tarea) {

  console.log(`"Tarea: ${tarea.title}, ID: ${tarea.id}, Completada: ${tarea.completed}"`)

}

