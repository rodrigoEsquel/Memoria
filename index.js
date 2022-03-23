function memoria() {
  const numeroPares = 8;
  const nombresParejas = [
    "Azul",
    "Gris",
    "Verde",
    "Rojo",
    "Amarillo",
    "Celeste",
    "Blanco",
    "Negro",
  ];
  const coloresParejas = [
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-light",
    "bg-dark",
  ];
  let IDcontador = 0;
  let puntaje = 0;


  function resetearJuego() {
    quitarCartas();
    if (IDcontador) {
      clearInterval(IDcontador);
    }
    puntaje = 0;
    actualizarPuntaje(puntaje);
  }

function actualizarPuntaje(puntaje) {
  document.querySelector("#puntaje").innerText = puntaje;
}


  function conseguirArrayAleatorio(numeroPares) {
    const pares = [];
    const arrayAleatorio = [];
    let i = 0;
    while (i < numeroPares) {
      let posicion = Math.trunc(numeroPares * 2 * Math.random());
      if (arrayAleatorio[posicion] === undefined) {
        arrayAleatorio[posicion] = i;
        if (pares[i] === "OK") {
          i++;
        } else {
          pares[i] = "OK";
        }
      }
    }
    return arrayAleatorio;
  }

  function configurarClickCarta(numeroDeCarta) {
    document.querySelectorAll(".card").forEach((element) => {
      element.onclick = numeroDeCarta;
    });
  }

  function crearCarta() {
    const $nuevaCarta = document.createElement("div");    
    $nuevaCarta.className = "card border border-dark m-1 invisible";
    $nuevaCarta.style = "width: 9rem";
    return $nuevaCarta;
  }

  function conseguirNombreCarta(id) {
    return nombresParejas[id];
  }

  function conseguirColorCarta(id) {
    return coloresParejas[id];
  }

  function crearCuerpoCarta(element) {
    const $cuerpoCarta = document.createElement("div");
    $cuerpoCarta.className = "card-body invisible";
    const $tituloCarta = document.createElement("h5");
    $tituloCarta.className = "card-title text-center";
    $tituloCarta.innerText = conseguirNombreCarta(element);
    const $colorCarta = document.createElement("div");
    $colorCarta.className = `${conseguirColorCarta(
      element
    )} img-thumbnail ratio ratio-4x3 border border-dark`;
    $cuerpoCarta.appendChild($tituloCarta);
    $cuerpoCarta.appendChild($colorCarta);
    return $cuerpoCarta;
  }

  function voltearCarta(element) {
    element.childNodes[0].classList.toggle("invisible");
  }

  function funcionPrimeraCarta(evento) {
    const $carta1 = evento.srcElement;
    voltearCarta($carta1);
    configurarClickCarta((evento) => funcionSegundaCarta(evento, $carta1));

    function funcionSegundaCarta(evento) {
      const $carta2 = evento.srcElement;
      voltearCarta($carta2);
      if ($carta1.innerHTML === $carta2.innerHTML) {
        setTimeout(() => {
          $carta1.classList.add("invisible");
          $carta2.classList.add("invisible");
        }, 500);
        puntaje++;
        actualizarPuntaje(puntaje);
      } else {
        setTimeout(() => {
          voltearCarta($carta1);
          voltearCarta($carta2);
        }, 500);
      }
      if (puntaje === 8) {
        clearInterval(IDcontador);
      }
      configurarClickCarta(funcionPrimeraCarta);
    }
  }
  function añadirCartas(arrayAleatorio) {
    arrayAleatorio.forEach((element) => {
      const $nuevaCarta = crearCarta();
      const $cuerpoCarta = crearCuerpoCarta(element);
      $nuevaCarta.appendChild($cuerpoCarta);

      const $Contenedor = document.querySelector("#contenedor-cartas");
      $Contenedor.appendChild($nuevaCarta);
    });
  }

  function mostrarCartas() {
    document.querySelectorAll(".card").forEach((element) => {
      element.classList.remove("invisible");
    });
  }

  function quitarCartas() {
    document.querySelector("#contenedor-cartas").innerHTML = "";
  }

  function iniciarJuego() {
    resetearJuego();
    añadirCartas(conseguirArrayAleatorio(numeroPares));
    configurarClickCarta(funcionPrimeraCarta);
    mostrarCartas();
    let contador = 0;
    IDcontador = iniciarContador();

    function iniciarContador() {
      return setInterval(() => {
        contador = Math.round((contador + 0.1) * 10) / 10;
        document.querySelector("#contador").innerText = contador;
      }, 100);
    }
    
  }

  //añadirCartas(conseguirArrayAleatorio(numeroPares));
  document.querySelector("#start").onclick = iniciarJuego;
}

memoria();
