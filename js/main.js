
document.addEventListener("DOMContentLoaded", function () {
  const miDiv = document.getElementById("palabras");
  const tablonPista = document.getElementById("pista");
  const imgColgado = document.getElementById("colgado");
  const botones = document.querySelectorAll(".letra");
  const miModalTxt = document.getElementById('exampleModal');
  const modalTxt = new bootstrap.Modal(miModalTxt);
  const miModalGanar = document.getElementById('ganarModal');
  const modalGanar = new bootstrap.Modal(miModalGanar);
  var ruta = "json/palabras.json";
  var palabra;
  var pista;
  var correctas;
  var vidas = 11;

  
  cargarPartida();
  

  function cargarPartida() {
    loadBotones();
    palabra = localStorage.getItem('palabra');
    pista = localStorage.getItem('pista');
    vidas = localStorage.getItem('vidas');
    correctas = localStorage.getItem('correctas');

    if (palabra == null) {
      fetch(ruta)
      .then(response => response.json())
      .then(data => {
        palabras = data
        console.log('Objeto "palabras":', palabras);
        cargarPalabraRandom(palabras);
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
    } else {
      loadEstadoPalabra();
      tablonPista.textContent = pista;
    }
  }

  

  function saveBotones() {
    const botonesList = [];
    const botones = document.querySelectorAll('.letra');
    botones.forEach(elemento => {
      botonesList.push(elemento.outerHTML);
    });
    localStorage.setItem('botonesList', JSON.stringify(botonesList));
  }

  function savePista() {
    localStorage.setItem('pista', pista);
  }

  function savePalabra() {
    localStorage.setItem('palabra', palabra);
  }

  function saveVidas() {
    localStorage.setItem('vidas', vidas);
    localStorage.setItem('correctas', correctas);
  }

  function saveEstadoPalabra() {
    const lertrasList = [];
    const letras = document.querySelectorAll(".palabra");
    console.log(letras);
    letras.forEach(elemento => {
      lertrasList.push(elemento.outerHTML);
    });
    localStorage.setItem('letrasList', JSON.stringify(lertrasList));
  }

  function loadEstadoPalabra() {
    const letras = JSON.parse(localStorage.getItem('letrasList')) || [];
    const container = document.getElementById('palabras');  
    container.innerHTML = "";
    letras.forEach(element => {
      container.innerHTML += element; 
    })
  }

  function loadBotones() {
     
    const botones = JSON.parse(localStorage.getItem('botonesList')) || [];
    if (botones.length === 0) {
      creatBotones();
    }else{
      const container = document.getElementById('teclado');  
      container.innerHTML = "";
      botones.forEach(element => {
        container.innerHTML += element; 
      });
      cargarEvntosBotones();
    }
  }

  function cargarEvntosBotones() {
    var botones = document.querySelectorAll(".letra");
    botones.forEach(function(boton) {
        boton.addEventListener("click", function() {
          console.log("clck");
          comprobar(boton);
          saveBotones();
          saveVidas();
          saveEstadoPalabra();
        });
    });
  }

  

  
  
  
  
  


  function cargarPalabraRandom(palabras) {
    let random1 = generarNumeroAleatorio(0, palabras.length - 1);
    let random2 = generarNumeroAleatorio(0, palabras[random1].palabras.length - 1);
    pista = palabras[random1].pista;
    palabra = palabras[random1].palabras[random2];
    tablonPista.textContent = pista;
    console.log(pista, palabra);
    savePista();
    savePalabra();
    correctas = palabra.length;
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

  


  function creatBotones() {
    const letras = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  const container = document.getElementById('teclado');
  letras.forEach(letra => {
    const button = document.createElement('button');
    button.className = 'letra';
    button.type = 'button';
    button.value = letra;
    button.id = letra;
    button.textContent = letra;
    container.appendChild(button);
    button.addEventListener("click", function () {
      comprobar(button);
      saveBotones();
      saveVidas();
      saveEstadoPalabra();
    });
  });
  }

  function comprobar(btn) {
    let correcto = false;
    var letrasPalabra = document.querySelectorAll(".palabra");
    console.log(letrasPalabra)
    letrasPalabra.forEach(function (letras) {
      if (btn.value == letras.value) {
        letras.textContent = letras.value;
        correcto = true;
        correctas -= 1;
      }
    });
    if (correcto) {
      if (correctas == 0) {
        modalGanar.show();
      }
      btn.style.backgroundColor = "#0000ff";
    } else {
      vidas -= 1;
      cambiarImg(vidas);
      btn.style.backgroundColor = "#ff0000";
    }
    btn.disable = true;
  }



















  function cambiarImg(vidas) {
    switch (vidas) {
      case 0:
        imgColgado.src = "img/ahor10.png";
        modalTxt.show();
        break;
      case 1:
        imgColgado.src = "img/ahor9.png";
        break;
      case 2:
        imgColgado.src = "img/ahor8.png";
        break;
      case 3:
        imgColgado.src = "img/ahor7.png";
        break;
      case 4:
        imgColgado.src = "img/ahor6.png";
        break;
      case 5:
        imgColgado.src = "img/ahor5.png";
        break;
      case 6:
        imgColgado.src = "img/ahor4.png";
        break;
      case 7:
        imgColgado.src = "img/ahor3.png";
        break;
      case 8:
        imgColgado.src = "img/ahor2.png";
        break;
      case 9:
        imgColgado.src = "img/ahor1.png";
        break;
      case 10:
        imgColgado.src = "img/ahor0.png";
        break;
      default:
        break;
    }

  }


});
