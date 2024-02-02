export function generateAdminHeader() {
    let adminHeader = document.createElement("div")
    let adminHeaderIcon = document.createElement("i")
    let adminHeaderTitle = document.createElement("span")

    adminHeader.setAttribute("id", "admin-header")
    adminHeaderIcon.classList.add("fa-regular", "fa-pen-to-square")
    adminHeaderIcon.setAttribute("id", "admin-header-icon")
    adminHeaderTitle.textContent = "Mode édition"
    adminHeaderTitle.setAttribute("id", "admin-header-title")
    document.querySelector("header").appendChild(adminHeader)
    adminHeader.appendChild(adminHeaderIcon)
    adminHeader.appendChild(adminHeaderTitle)
    document.querySelector("header").style.margin = "110px 0 50px 0"
}
export function generateWorksUpdateButton() {
    let modifDiv = document.createElement("span")
    let modifIcon = document.createElement("i")
    let modifSpan = document.createElement("span")

    modifDiv.setAttribute("id", "modifDiv")
    modifIcon.classList.add("fa-regular", "fa-pen-to-square")
    modifIcon.setAttribute("id", "modifIcon")
    modifSpan.setAttribute("id", "modifSpan")
    modifSpan.textContent = "Modifier"
    modifDiv.appendChild(modifIcon)
    modifDiv.appendChild(modifSpan)
    document.querySelector("#portfolio h2").appendChild(modifDiv)
    modifDiv.addEventListener("click", () => {
        document.getElementById("delete-work-modal").showModal()
    })
}
export function updateLoginToLogout() {
    let logout = document.getElementById("login")

    logout.textContent = "logout"
    logout.style.cursor = "pointer"
    logout.addEventListener("click", () => {
        localStorage.removeItem("token")
        location.reload()
    })
}

export default function generateAdminUI() {
    generateAdminHeader()
    generateWorksUpdateButton()
    updateLoginToLogout()
}