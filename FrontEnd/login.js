document.querySelector(".login-form").addEventListener("click", event => {
    if (event.target === document.getElementById("login-form__email")
        || event.target === document.getElementById("login-form__password")) {
        document.getElementById("error-message").textContent = null
    }
});
document.querySelector(".login-form").addEventListener("submit", async event => {
    event.preventDefault()
    if (document.getElementById("login-form__email").validity.valid &&
        document.getElementById("login-form__password").validity.valid) {
        try {
            let email = document.getElementById("login-form__email").value
            let password = document.getElementById("login-form__password").value
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                let userData = await response.json()
                localStorage.setItem("token", userData.token)
                window.location.href = "./index.html"
            }
            else if (response.status === 401) {
                throw new Error("E-mail et/ou mot de passe incorrect(s)")
            }
            else { throw new Error("Une erreur est survenue lors de la tentative de connexion") }
        } catch (error) { document.getElementById("error-message").textContent = error.message }
    }
    else { document.getElementById("error-message").textContent = "Veuillez renseigner un E-mail et un mot de passe" }
});