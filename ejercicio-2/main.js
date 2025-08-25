/*Instrucciones:

Ejercicio de Funciones:

a. Crea una función llamada calcularAreaTriangulo que tome dos parámetros: base y altura. Esta función debería calcular y retornar el área de un triángulo utilizando la fórmula (base * altura) / 2.

b. Crea una función llamada calcularCircunferencia que tome un parámetro radio. Esta función debería calcular y retornar la circunferencia de un círculo utilizando la fórmula 2 * Math.PI * radio.

c. Llama a ambas funciones y muestra los resultados en la consola.

Ejercicio de Recursividad:

a. Crea una función recursiva llamada calcularFactorial que tome un parámetro n. Esta función debería calcular y retornar el factorial de n. (Recuerda que el factorial de un número n es el producto de todos los enteros positivos desde 1 hasta n).

b. Llama a la función calcularFactorial con un número entero y muestra el resultado en la consola.

Ejercicio Combinado:

a. Crea una función llamada calcularPotencia que tome dos parámetros: base y exponente. Esta función debería calcular y retornar base elevado a la exponente utilizando recursividad.

b. Llama a la función calcularPotencia con valores diferentes y muestra los resultados en la consola.

Entrega:

Crea un archivo JavaScript con el código de tus soluciones.
Si es posible, agrega comentarios explicando tu razonamiento y cómo resolviste cada ejercicio.
Envía el archivo a tu instructor para su revisión. */


function calcularAreaTriangulo(base, altura) {

  return (base * altura) / 2;
}


function calcularCircunferencia(radio) {

  return 2 * Math.PI * radio;
}


console.log(calcularAreaTriangulo(20, 35));
console.log(calcularCircunferencia(60));



function calcularFactorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n debe ser un entero >= 0");
  }
  if (n === 0 || n === 1) return 1;
  return n * calcularFactorial(n - 1);
}


console.log(calcularFactorial(5));
console.log(calcularFactorial(0));



function calcularPotencia(base, exponente) {
  if (!Number.isInteger(exponente)) {
    throw new Error("exponente debe ser entero");
  }
  if (exponente === 0) return 1;
  if (exponente < 0) return 1 / calcularPotencia(base, -exponente);

  if (exponente % 2 === 0) {
    const mitad = calcularPotencia(base, exponente / 2);
    return mitad * mitad;
  }
  return base * calcularPotencia(base, exponente - 1);
}


console.log(calcularPotencia(2, 10));
console.log(calcularPotencia(5, 0));
console.log(calcularPotencia(2, -3)); 