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

  function crearCarta(element) {
    const $nuevaCarta = document.createElement("div");
    $nuevaCarta.id = `pareja-${element}`;
    $nuevaCarta.className = "card border border-dark m-1 invisible";
    $nuevaCarta.style = "width: 9rem";
    return $nuevaCarta;
  }

  function crearCuerpoCarta(element) {
    const $cuerpoCarta = document.createElement("div");
    $cuerpoCarta.className = "card-body invisible";
    const $tituloCarta = document.createElement("h5");
    $tituloCarta.className = "card-title text-center";
    $tituloCarta.innerText = nombresParejas[element];
    const $colorCarta = document.createElement("div");
    $colorCarta.className = `${coloresParejas[element]} img-thumbnail ratio ratio-4x3 border border-dark`;
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
      console.log($carta1);
      if ($carta1.id === $carta2.id) {
        setTimeout(() => {
          $carta1.classList.add("invisible");
          $carta2.classList.add("invisible");
        }, 500);
      } else {
          setTimeout(() => {
            voltearCarta($carta1);
            voltearCarta($carta2);
          }, 500);
      }
      if (false) {
      }
      configurarClickCarta(funcionPrimeraCarta);
    }
  }
  function añadirCartas(arrayAleatorio) {
    arrayAleatorio.forEach((element) => {
      const $nuevaCarta = crearCarta(element);
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
    quitarCartas();
    añadirCartas(conseguirArrayAleatorio(numeroPares));
    configurarClickCarta(funcionPrimeraCarta);
    mostrarCartas();
  }
  document.querySelector("#start").onclick = iniciarJuego;
}

memoria();
