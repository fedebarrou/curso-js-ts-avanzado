/** Variable restringida al tipo literal Color */
// let color: Color = 'amarillo';  --> no me permite agregarlo ya que no esta declarado en el type literal Color
//declaramos funcion que admita el parametro de tipo literal color, marcamos void porque no retorna nada la funcion, solo muestra en consola
function mostrarColor(color) {
    console.log('Color:', color);
}
//solo se permiten pasar como parametro los tipos literales el amarillo marca error
mostrarColor('azul'); //--> correcto
// let edad :Edad = 11 --> Error , 11 no se encuentra en el type "Edad"
function mostrarEdad(edad) {
    console.log('Edad:', edad);
}
//Solo se permiten las correctas 18 , 21  y 30
mostrarEdad(21); //--> correcto
//mostrarEdad(11); //--> incorrecto
function mostrarEdadYColor(color, edad) {
    console.log(`Tiene ${edad} años y su color favorito es ${color}`);
}
mostrarEdadYColor('verde', 30);
