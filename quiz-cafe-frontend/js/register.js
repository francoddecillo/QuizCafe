document.addEventListener("DOMContentLoaded", () => {
    const botonRegistrar = document.getElementById("btnRegistrar");

    if (botonRegistrar) {
        botonRegistrar.addEventListener("click", async () => {
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!nombre || !apellido || !email || !password) {
                alert("⚠️ Completa todos los campos");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("📧 El correo electrónico no es válido.");
                return;
            }

            if (password.length < 8 || password.length > 25) {
                alert("🔐 La contraseña debe tener entre 8 y 25 caracteres.");
                return;
            }

            try {
                const respuesta = await fetch("http://localhost:8080/api/usuarios/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({ nombre, apellido, email, password })
                });

                if (respuesta.ok) {
                    const usuario = await respuesta.json();
                    localStorage.setItem("usuario", usuario.nombre);
                    localStorage.setItem("nivel", "1");

                    alert("✅ Sesión iniciada correctamente.");
                    location.href = "quiz.html";
                } else {
                    const error = await respuesta.text();
                    alert("❌ Error al registrar usuario: " + error);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("⚠️ No se pudo conectar con el servidor.");
            }
        });
    }
});
