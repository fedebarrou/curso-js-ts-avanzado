/* EJERCICIO 1 */


// Declaro el Objeto "persona"
const persona = {
  nombre: "Fede",
  edad: 30,
  correo: "fede@mail.com",
};

// Declaro el tipo "TipoPersona" con los nombres de las propiedades de persona
type TipoPersona = keyof typeof persona;


// Función imprimirDetalle
function imprimirDetalle<K extends TipoPersona>(clave: K, obj: typeof persona): void {
  console.log(`${String(clave)}`, obj[clave]);
}


imprimirDetalle("nombre", persona);
imprimirDetalle("edad", persona);




/* EJERCICIO 2 */

// recomendacion de usar Record en vez de type Mascotas = { [animal: string]: number };
type Mascotas = Record<string, number>;


type EdadDeMascota<M extends Mascotas, K extends keyof M> = M[K];


function obtenerEdadMascota<M extends Mascotas, K extends keyof M>(nombre: K, obj: M): EdadDeMascota<M, K> {
  return obj[nombre];
}

const misMascotas = { perro: 5, gato: 2, loro: 1 };

const edadGato = obtenerEdadMascota("gato", misMascotas);
console.log("Edad gato:", edadGato);



/* EJERCICIO 3 */


type Requerido<T> = { [P in keyof T]-?: T[P] };

// Objeto 'datos'
const datos = {
  nombre: "Fede",
  edad: 30,
  correo: "fede@mail.com",
};


type DatosRequeridos = Requerido<typeof datos>;


const bien: DatosRequeridos = {
  nombre: "Fede",
  edad: 30,
  correo: "fede@mail.com",
};


/*
const mal: DatosRequeridos = {
  // @ts-expect-error Falta 'correo'
  nombre: "Fede",
  edad: 30,
};
*/


