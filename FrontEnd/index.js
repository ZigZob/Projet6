var worksArray = []
var worksCategories = []

async function fetchWorksCategories() {
    worksCategories = await (await fetch("http://localhost:5678/api/categories/")).json()
}
async function fetchWorks() {
    worksArray = await (await fetch("http://localhost:5678/api/works/")).json()
}

try {
    await fetchWorks()
} catch { alert("Une erreur est survenue lors de la récupération des travaux") }
try {
    await fetchWorksCategories()
} catch { alert("Une erreur est survenue lors de la récupération des catégories de travaux") }


import generateGallery from "./modules/gallery.js"
generateGallery(worksArray)

import generateAdminUI from "./modules/adminUI.js"
import generateFilters from "./modules/filters.js"
import generateDeleteWorkModal from "./modules/deleteWorkModal.js"
import generateAddWorkModal from "./modules/addWorkModal.js"

if (localStorage.getItem("token") === null || undefined) { generateFilters(worksCategories) }
else {
    generateAdminUI()
    generateDeleteWorkModal(worksArray)
    generateAddWorkModal(worksCategories)
    document.querySelectorAll("dialog").forEach(modal => {

        modal.addEventListener("click", event => {
            const modalDimensions = modal.getBoundingClientRect()
            if (
                event.clientX < modalDimensions.left ||
                event.clientX > modalDimensions.right ||
                event.clientY < modalDimensions.top ||
                event.clientY > modalDimensions.bottom ||
                event.target.classList.contains("close-modal")
            ) {
                modal.close()
            }
        })
    });
}