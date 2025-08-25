'use strict'

/*
Ejercicio de Prototipos:

a. Crea una función constructora llamada Animal que tome dos argumentos: nombre (string) y edad (número). Esta función debería asignar estos valores a las propiedades correspondientes del objeto que está siendo creado y debería tener un método hablar() que imprima un mensaje que diga: "Hola, soy [nombre del animal] y tengo [edad] años".

b. Crea un prototipo llamado perro que herede de Animal y añade un método ladrido() que imprima: "¡Guau!".

c. Crea una instancia de perro llamada miPerro y prueba ambos métodos.


*/


{ /* METODO MODERNO */ }

class Animal {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  hablar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
  }
}

class Perro extends Animal {
  ladrido() {
    console.log("¡Guau!");
  }
}

const firu = new Perro("Firulais", 4);
firu.hablar();
firu.ladrido();



{ /* METODO CLASICO */ }


function AnimalClasico(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

AnimalClasico.prototype.hablar = function () {
  console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
};

function PerroClasico(nombre, edad) {
  AnimalClasico.call(this, nombre, edad);
}

PerroClasico.prototype = Object.create(AnimalClasico.prototype);
PerroClasico.prototype.constructor = PerroClasico;

PerroClasico.prototype.ladrido = function () {
  console.log("¡Guau!");
};

const firulete = new PerroClasico("FirulaisClasico", 40);
firulete.hablar();
firulete.ladrido();





/*

Ejercicio de Modelo de Herencia:

a. Define una función constructora Persona que tome tres argumentos: nombre, edad y profesion.

b. Crea un prototipo llamado Estudiante que herede de Persona y añade una propiedad adicional grado (string) y un método estudiar() que imprima: "Estudiando para obtener el grado de [grado]".

c. Crea un prototipo llamado Profesor que herede de Persona y añade una propiedad adicional especialidad (string) y un método enseñar() que imprima: "Enseñando [especialidad]".

d. Crea una instancia de Estudiante llamada miEstudiante y una instancia de Profesor llamada miProfesor, y prueba sus métodos.

*/


function Persona(nombre, edad, profesion) {
  this.nombre = nombre;
  this.edad = edad;
  this.profesion = profesion;
}

function Estudiante(nombre, edad, grado) {
  Persona.call(this, nombre, edad);
  this.grado = grado;
}

Estudiante.prototype = Object.create(Persona.prototype);
Estudiante.prototype.constructor = Estudiante;

Estudiante.prototype.estudiar = function () {
  console.log(`Estudiando para obtener el grado de ${this.grado}`);
};


function Profesor(nombre, edad, profesion, especialidad) {
  Persona.call(this, nombre, edad, profesion);
  this.especialidad = especialidad;
}

Profesor.prototype = Object.create(Persona.prototype);
Profesor.prototype.constructor = Profesor;


Profesor.prototype.ensenio = function () {
  console.log(`Enseñando ${this.especialidad}`);
};


let miEstudiante = new Estudiante("Fede", 35, "Desarrollador web");
miEstudiante.estudiar();

console.log(miEstudiante.nombre)


let miProfesor = new Profesor("Girafales", 55, "Desarrollador web", "Corregir");
miProfesor.ensenio();

/*

Ejercicio de Composición vs Herencia:

a. Considerando el código de los ejercicios anteriores, reflexiona sobre cuándo es preferible usar la composición sobre la herencia en el diseño de objetos en JavaScript.

Entrega:

Crea un archivo JavaScript con el código de tus soluciones.
Si es posible, agrega comentarios explicando tu razonamiento y cómo resolviste cada ejercicio.
Envía el archivo a tu instructor para su revisión.
Tiempo Estimado: Esta actividad debería tomar aproximadamente 1-2 horas, dependiendo del nivel de experiencia con JavaScript.
*/




