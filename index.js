function memoria() {
  //GLOBALES
  let IDcontador = 0;
  let puntaje = 0;
  let contador = 0;
  let primerClick = true;
  let $carta1 = "";
  let turno = 0;

  //FUNCIONES
  function quitarCartas() {
    document.querySelector("#contenedor-cartas").innerHTML = "";
  }

  function resetearJuego() {
    quitarCartas();
    primerClick = true;
    if (IDcontador) {
      clearInterval(IDcontador);
    }
    puntaje = 0;
    turno = 0;
    document.querySelector("#puntaje").innerText = puntaje;
    document.querySelector("#turno").innerText = turno;
  }

  function crearCarta() {
    const $nuevaCarta = document.createElement("div");
    $nuevaCarta.className = "card border border-dark m-1 invisible";
    $nuevaCarta.style = "width: 9rem";
    $nuevaCarta.onclick = manejarClickCarta;
    return $nuevaCarta;
  }

  function conseguirNombreCarta(id) {
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
    return nombresParejas[id];
  }

  function conseguirColorCarta(id) {
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

  function conseguirArrayAleatorio() {
    const numeroPares = 8;
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

  function voltearCarta(element) {
    element.childNodes[0].classList.toggle("invisible");
  }

  function aniadirCartas(arrayAleatorio) {
    arrayAleatorio.forEach((element) => {
      const $nuevaCarta = crearCarta();
      const $cuerpoCarta = crearCuerpoCarta(element);
      $nuevaCarta.appendChild($cuerpoCarta);
      const $Contenedor = document.querySelector("#contenedor-cartas");
      $Contenedor.appendChild($nuevaCarta);
    });
  }

  function iniciarContador() {
    return setInterval(() => {
      contador = Math.round((contador + 0.1) * 10) / 10;
      document.querySelector("#contador").innerText = contador;
    }, 100);
  }

  function manejarClickCarta(evento) {
    voltearCarta(evento.target);
    if (primerClick) {
      $carta1 = evento.target;
    } else {
      let $carta2 = evento.target;
      if ($carta1.innerHTML === $carta2.innerHTML) {
        setTimeout(() => {
          $carta1.classList.add("invisible");
          $carta2.classList.add("invisible");
        }, 500);
        document.querySelector("#puntaje").innerText = puntaje++;
      } else {
        setTimeout(() => {
          voltearCarta($carta1);
          voltearCarta($carta2);
        }, 500);
      }
      document.querySelector("#turno").innerText = turno++;
      if (puntaje === 8) {
        clearInterval(IDcontador);
      }
    }
    primerClick = !primerClick;
  }

  function mostrarCartas() {
    document.querySelectorAll(".card").forEach((element) => {
      element.classList.remove("invisible");
    });
  }

  function iniciarJuego() {
    resetearJuego();
    aniadirCartas(conseguirArrayAleatorio());
    mostrarCartas();
    contador = 0;
    IDcontador = iniciarContador();
  }

  //INICIO
  document.querySelector("#start").onclick = iniciarJuego;

  
}

memoria();
