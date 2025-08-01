document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (!usuario || !token) {
        alert("⚠️ Debes iniciar sesión para jugar.");
        location.href = "index.html";
        return;
    }

    const bienvenidaEl = document.getElementById("bienvenida");
    if (bienvenidaEl) bienvenidaEl.textContent = `Nivel 1`;

    let preguntas = [];
    let indice = 0;
    let puntaje = 0;
    let nivel = parseInt(localStorage.getItem("nivel")) || 1;

    cargarNivel(nivel);

    function cargarNivel(nuevoNivel) {
        nivel = nuevoNivel;
        indice = 0;
        puntaje = 0;
        localStorage.setItem("nivel", nivel);

        fetch(`http://localhost:8081/api/preguntas/nivel/${nivel}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                if (res.status === 401) {
                    alert("⚠️ Tu sesión expiró. Inicia sesión nuevamente.");
                    location.href = "index.html";
                    return;
                }
                return res.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    document.getElementById("quiz").innerHTML = "<h2>No hay preguntas para este nivel.</h2>";
                    return;
                }
                preguntas = data;
                mostrarPregunta();
            })
            .catch(err => {
                console.error("Error al cargar preguntas:", err);
                alert("❌ No se pudieron cargar las preguntas.");
            });
    }

    function mostrarPregunta() {
        const preguntaEl = document.getElementById("pregunta");
        const opcionesDiv = document.getElementById("opciones");
        const btnSiguiente = document.getElementById("siguiente");

        if (indice >= preguntas.length) {
            mostrarPantallaFinal();
            return;
        }

        const preguntaActual = preguntas[indice];
        preguntaEl.textContent = preguntaActual.pregunta;

        opcionesDiv.innerHTML = "";
        [preguntaActual.opcion1, preguntaActual.opcion2, preguntaActual.opcion3].forEach((opcion, i) => {
            const btn = document.createElement("button");
            btn.textContent = opcion;
            btn.classList.add("opcion-btn");
            btn.addEventListener("click", () => seleccionarRespuesta(i + 1));
            opcionesDiv.appendChild(btn);
        });

        btnSiguiente.style.display = "none";
    }

    function seleccionarRespuesta(respuesta) {
        const correcta = preguntas[indice].correcta;
        const botones = document.querySelectorAll(".opcion-btn");

        botones.forEach((btn, i) => {
            if (i + 1 === correcta) btn.style.backgroundColor = "rgba(76,175,80,0.5)";
            else if (i + 1 === respuesta) btn.style.backgroundColor = "rgba(244,67,54,0.5)";
            btn.disabled = true;
        });

        if (respuesta === correcta) puntaje++;

        const btnSiguiente = document.getElementById("siguiente");
        btnSiguiente.style.display = "block";
        btnSiguiente.onclick = () => {
            indice++;
            mostrarPregunta();
        };
    }

    function mostrarPantallaFinal() {
        const quizEl = document.getElementById("quiz");
        const siguienteNivel = nivel + 1;

        fetch(`http://localhost:8081/api/preguntas/nivel/${siguienteNivel}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                let botonesHTML = `<button class="boton-volver" onclick="location.href='index.html'">🏠 Volver al inicio</button>`;

                if (data.length > 0) {
                    botonesHTML += `<button class="boton-nivel" id="btnSiguienteNivel">➡️ Siguiente nivel</button>`;
                } else {
                    // ✅ Si NO hay más niveles, cerrar sesión automáticamente
                    localStorage.clear();
                }

                const imagen = `img/cafe${siguienteNivel}.png`;

                quizEl.innerHTML = `
                    <h2>🎉 ¡Felicidades, completaste el Nivel ${nivel}!</h2>
                    <img src="${imagen}" alt="Nivel ${nivel}" class="nivel-imagen">
                    <p>Tu puntaje final: ${puntaje} / ${preguntas.length}</p>
                    <div class="botones-fin">${botonesHTML}</div>
                `;

                if (data.length > 0) {
                    document.getElementById("btnSiguienteNivel").addEventListener("click", () => {
                        quizEl.innerHTML = `
                            <h2 id="bienvenida">Nivel ${nivel + 1} </h2>
                            <h3 id="pregunta">Cargando pregunta...</h3>
                            <div id="opciones" class="opciones"></div>
                            <button id="siguiente" class="boton-siguiente" style="display:none;">Siguiente</button>
                        `;
                        cargarNivel(siguienteNivel);
                    });
                }
            })
            .catch(err => console.error("Error al mostrar pantalla final:", err));
    }

    window.cerrarSesion = function () {
        localStorage.clear();
        location.href = "index.html";
    };
});
