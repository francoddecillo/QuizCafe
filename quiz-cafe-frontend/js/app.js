document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("login-form");

    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("⚠️ Ingresa email y contraseña.");
            return;
        }

        try {
            const respuesta = await fetch("http://localhost:8080/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ email, password }),
            });

            if (respuesta.ok) {
                if (respuesta.ok) {
                    const usuario = await respuesta.json();

                    localStorage.setItem("usuario", usuario.nombre);
                    localStorage.setItem("token", usuario.token);  // ✅ Guardar token
                    localStorage.setItem("nivel", "1");

                    alert("✅ Usuario registrado y sesión iniciada.");
                    location.href = "quiz.html";
                }

            } else {
                alert("❌ Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("⚠️ No se pudo conectar con el servidor.");
        }
    });
});
