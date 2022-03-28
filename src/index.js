function memoria() {
  //GLOBALES
  const NUMERO_PARES = 8;
  let IDcontador = 0;
  let $puntaje = document.querySelector("#puntaje");
  let $contador = document.querySelector("#contador");
  let $turno = document.querySelector("#turno");
  let clickHabilitado = true; // Se debe esperar a que finalizen los setTimeouts para manejas la comparacion de parejas o se genera un bug donde el siguiente "primerClick" es el que se utiliza en el setTimeout
  let $carta1 = "";

  //FUNCIONES
  function quitarCartas() {
    document.querySelector("#contenedor-cartas").innerHTML = "";
  }

  function aumentarElemento(element) {
    element.innerText = Number(element.innerText) + 1;
  }

  function resetearTurno() {
    clickHabilitado = true;
    $carta1 = "";
  }

  function detenerContador() {
    if (IDcontador) {
      clearInterval(IDcontador);
    }
  }

  function resetearJuego() {
    quitarCartas();
    resetearTurno();
    detenerContador();
    $puntaje.innerText = 0;
    $turno.innerText = 0;
  }

  function crearCarta() {
    const $nuevaCarta = document.createElement("div");
    $nuevaCarta.className = "card border border-dark m-1 invisible";
    $nuevaCarta.style = "width: 9rem";
    return $nuevaCarta;
  }

  function conseguirNombreCarta(indice) {
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
    return nombresParejas[indice];
  }

  function conseguirColorCarta(indice) {
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
    return coloresParejas[indice];
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
    const pares = [];
    const arrayAleatorio = [];
    let i = 0;
    while (i < NUMERO_PARES) {
      let posicion = Math.trunc(NUMERO_PARES * 2 * Math.random());
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
    element.firstChild.classList.toggle("invisible");
  }

  function ocultarCarta(element) {
    element.classList.add("invisible");
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
      aumentarElemento($contador);
    }, 1000);
  }

  function manejarClickCarta(evento) {
    if (clickHabilitado && evento.target.classList.contains("card")) { // Se fija que el click sea sobre una carta - (Ver definicion de clickHabilitado)
      voltearCarta(evento.target);
      if ($carta1 === "") {
        $carta1 = evento.target;
      } else {
        let $carta2 = evento.target;
        clickHabilitado = false;
        if ($carta1.innerHTML === $carta2.innerHTML) {
          setTimeout(() => {
            ocultarCarta($carta1);
            ocultarCarta($carta2);
            resetearTurno();
          }, 500);
          aumentarElemento($puntaje);
        } else {
          setTimeout(() => {
            voltearCarta($carta1);
            voltearCarta($carta2);
            resetearTurno();
          }, 500);
        }
        aumentarElemento($turno);
        if ($puntaje.innerText === NUMERO_PARES) {
          detenerContador();
        }
      }
    }
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
    $contador.innerText = 0;
    IDcontador = iniciarContador();
  }

  //INICIO
  document.querySelector("#start").onclick = iniciarJuego;
  document.querySelector("#contenedor-cartas").onclick = manejarClickCarta;
}

memoria();
