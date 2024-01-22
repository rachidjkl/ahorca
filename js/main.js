const palabras = require('palabras.mjs');
document.addEventListener("DOMContentLoaded",function(){
    palabras.forEach(grupo => {
        console.log(`Pista: ${grupo.pista}`);
        console.log('Palabras:', grupo.palabras);
      });
});
