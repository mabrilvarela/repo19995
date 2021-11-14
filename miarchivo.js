let numeroUsuario = parseInt(prompt("Ingrese numero a adivinar, de 0 a 20"));

const numeroSecreto = 9;

let intentos = 1;

while (numeroUsuario != numeroSecreto) {

    numeroUsuario = parseInt(prompt("Intente de nuevo"));

    intentos++;

} 

alert ("Felicitaciones, descubriste el número secreto, tus intentos fueron: " + intentos);