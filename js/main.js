
document.addEventListener("DOMContentLoaded",function(){
  const miDiv = document.getElementById("palabras");
  const tablonPista = document.getElementById("pista");
  const btnA = document.getElementById("A");
  const btnB = document.getElementById("B");
  const btnC = document.getElementById("C");
  const btnD = document.getElementById("D");
  const btnE = document.getElementById("E");
  const btnF = document.getElementById("F");
  const btnG = document.getElementById("G");
  const btnH = document.getElementById("H");
  const btnI = document.getElementById("I");
  const btnJ = document.getElementById("J");
  const btnK = document.getElementById("K");
  const btnL = document.getElementById("L");
  const btnM = document.getElementById("M");
  const btnN = document.getElementById("N");
  const btnO = document.getElementById("O");
  const btnP = document.getElementById("P");
  const btnQ = document.getElementById("Q");
  const btnR = document.getElementById("R");
  const btnS = document.getElementById("S");
  const btnT = document.getElementById("T");
  const btnU = document.getElementById("U");
  const btnV = document.getElementById("V");
  const btnW = document.getElementById("W");
  const btnX = document.getElementById("X");
  const btnY = document.getElementById("Y");
  const btnZ = document.getElementById("Z");

  var ruta = "json/palabras.json";
  var palabra;
  var pista;

  var vidas = 10;


  fetch(ruta)
    .then(response => response.json())
    .then(data => {
        palabras = data
        console.log('Objeto "palabras":', palabras);
        cargarPalabraRandom(palabras);
    })
    .catch(error => console.error('Error al cargar el JSON:', error));


    function cargarPalabraRandom(palabras) {
      let random1 = generarNumeroAleatorio(0,palabras.length-1);
      let random2 = generarNumeroAleatorio(0,palabras[random1].palabras.length-1);
      pista = palabras[random1].pista;
      palabra = palabras[random1].palabras[random2];
      tablonPista.textContent = pista;
      console.log(pista, palabra);
      for (let index = 0; index < palabra.length; index++) {
        let letra = document.createElement("p");
        letra.classList.add("palabra");
        letra.textContent = "_";
        letra.value = palabra[index];
        miDiv.appendChild(letra);
      }
    }

    function generarNumeroAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function comprobar(btn) {
      var letrasPalabra = document.querySelectorAll(".palabra");
      console.log(letrasPalabra)
      letrasPalabra.forEach(function(letras) {
        console.log(letras.value)
        console.log(btn.value)
        if(btn.value == letras.value){
          letras.textContent = letras.value;
          btn.style.backgroundColor = "#ff0000";
        }else{
          btn.style.backgroundColor = "#0000ff";
        }
      btn.disable = true;
      });
    }

    btnA.addEventListener("click", function() {
      console.log("clck");
      comprobar(btnA);
    });


});
