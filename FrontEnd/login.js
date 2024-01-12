document.getElementById("login-form__submit").addEventListener("submit", async event => {
    event.preventDefault()
    let email = document.getElementById("login-form__email").value
    let password = document.getElementById("login-form__password").value
    const response = await fetch("http://localhost:5678/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })

    });
    console.log(response)
    if (response.ok) {
        let userData = await response.json()
        localStorage.setItem("token", userData.token)
        window.location.href = "./index.html"
    }
});