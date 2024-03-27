
document.addEventListener("DOMContentLoaded", function () {
  const miDiv = document.getElementById("palabras");
  const miNombreModal = document.getElementById("nombreModal");
  const nombreModal = new bootstrap.Modal(miNombreModal);
  const btnJugar = document.getElementById("btnJugar");
  const inpNombre = document.getElementById("inpNombre");
  
  const tablonPista = document.getElementById("pista");
  const btnVolver = document.querySelectorAll(".btnVolver");
  const btnSalir = document.querySelectorAll(".btnSalir");
  const miModalTxt = document.getElementById('exampleModal');
  const modalTxt = new bootstrap.Modal(miModalTxt);
  const miModalGanar = document.getElementById('ganarModal');
  const modalGanar = new bootstrap.Modal(miModalGanar);
  var ruta = "json/palabras.json";
  var palabra;
  var pista;
  var correctas;
  var vidas;

  
  cargarPartida();

  btnVolver.forEach(function(boton) {
    boton.addEventListener("click", function() {
      nombre = localStorage.getItem('nombre');
      localStorage.clear();
      localStorage.setItem('nombre', nombre);
      location.reload();
    });
  });

  btnSalir.forEach(function(boton) {
    boton.addEventListener("click", function() {
      localStorage.clear();
      location.reload();
    });
  });

  
  btnJugar.addEventListener("click", function() {
    localStorage.setItem('nombre', inpNombre.value);
    nombreModal.hide();
  });


  function cargarPartida() {
    loadBotones();
    palabra = localStorage.getItem('palabra');
    pista = localStorage.getItem('pista');
    
    correctas = localStorage.getItem('correctas');
    nombre = localStorage.getItem('nombre');

    if (palabra == null) {
      if (nombre == null) {
        nombreModal.show(); 
      }
      vidas = 11;
      fetch(ruta)
      .then(response => response.json())
      .then(data => {
        palabras = data
        console.log('Objeto "palabras":', palabras);
        cargarPalabraRandom(palabras);
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
    } else {
      vidas = localStorage.getItem('vidas');
      console.log(vidas);
      cambiarImg(vidas);
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
      lertrasList.push(elemento.innerHTML);
    });
    localStorage.setItem('letrasList', JSON.stringify(lertrasList));
  }

  function loadEstadoPalabra() {
    const letras = JSON.parse(localStorage.getItem('letrasList')) || [];
    console.log("dftrtr" + letras);
    const container = document.getElementById('palabras');  
    container.innerHTML = "";
    let index = 0;
    letras.forEach(element => {
      let letra = document.createElement("p");
      letra.classList.add("palabra");
      letra.textContent = element;
      letra.value = palabra[index];
      miDiv.appendChild(letra);
      index++;
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
      funClick(button);
    });
    function funClick(button) {
      comprobar(button);
      saveBotones();
      saveVidas();
      saveEstadoPalabra();
      button.disabled = true;
      button.removeEventListener("click", desactivarBoton);
    }
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
      btn.style.backgroundColor = "rgba(46, 204, 113,1.0)";
    } else {
      vidas -= 1;
      cambiarImg(vidas);
      btn.style.backgroundColor = "rgb(236, 77, 77)";
    }
  }



















  function cambiarImg(vidas) {
    const imgColgado = document.getElementById("colgado");
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
