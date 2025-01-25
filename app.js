
/*let parrafo=document.querySelector('p');
parrafo.innerHTML='Indica un N° del 1 al 10'; //reemplazado por el generico
*/ 
/*function asignarTextoElemento(){
    let titulo=document.querySelector('h1'); //document se usa para "conectar" JS con el HTML, en este caso trae el OBJETO, no el contenido que tenga
    titulo.innerHTML= 'Juego del N° secreto';
} antigua*/
let numeroSecreto=0; //Dejar porque se declara aca
let intentos=0;
let listaNumSorteados=[];
let numMax=10;
function asignarTextoElemento(elemento, texto){ //elemento y texto son parametros
    let elementoHTML=document.querySelector(elemento); //se cambio a elementoHTML para que sea mas generico
    elementoHTML.innerHTML= texto;
    return; //es buena practica poner return aun cuando no retorne nada
}
function verificarIntento(){
    let numeroDeUsuario= parseInt(document.getElementById('valorUsuario').value); //getElementById es en vez de querySelector mediante id
    
    //== si son iguales los valores === si ademas son de igual tipo de valor (string, int, float, etc.)
    if (numeroDeUsuario=== numeroSecreto){
        asignarTextoElemento('p',`Correcto, resuelto en ${intentos} ${intentos==1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        //El usuario no acerto  
        if (numeroDeUsuario> numeroSecreto){
            asignarTextoElemento('p','El N° secreto es menor');
        }else{
            asignarTextoElemento('p','El N° secreto es mayor');    
        }
        intentos++;
        limpiarCaja();
    }
    return; 
}
function limpiarCaja(){
    document.querySelector('#valorUsuario').value=''; //# es para usar id en querySelector
}

function generarNumSecreto() {
    //let numeroSecreto=Math.floor(Math.random()*10)+1; //no hace falta puesto que la variable sera colocada arriba
    let numeroGenerado= Math.floor(Math.random()*numMax)+1;
    //Si ya sorteamos todos los N°
    console.log(numeroGenerado)
    if (listaNumSorteados.length==numMax) {
        asignarTextoElemento('p','Ya se asignaron todos los N° posibles :C')
    }else{
        //Si el N° generado esta en la lista
        if (listaNumSorteados.includes(numeroGenerado)) {
            //Recursividad
            return generarNumSecreto();
        }else{
            listaNumSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del N° secreto :)');//En el HTML las funciones se deben llamar en eventos (como onclick)
    //Hoisting: Se encarga de que las funciones sean lo primero que se revisa en el javascript sin importar donde esten en el doc
    asignarTextoElemento('p',`Indica un N° del 1 al ${numMax}`);
    numeroSecreto=generarNumSecreto();
    intentos=1;
}
function reiniciarJuego() {
    /*QUE HACER
    limpiar la caja
    Mensaje de intervalo de N°
    Generar nuevo N° aleatorio
    Deshabilitar boton
    Inicializar N° de intentos
    */
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
condicionesIniciales();