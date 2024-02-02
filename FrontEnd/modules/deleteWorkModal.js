export function generateModalWork(work) {
    let modalGalleryFigure = document.createElement("figure")
    modalGalleryFigure.setAttribute("data-id", work.id)

    let deleteWorkBtn = document.createElement("i")
    deleteWorkBtn.classList.add("fa-solid", "fa-trash-can", "delete-work-icon")
    deleteWorkBtn.setAttribute("data-id", work.id)
    modalGalleryFigure.appendChild(deleteWorkBtn)

    let modalGalleryImg = document.createElement("img")
    modalGalleryImg.src = work.imageUrl
    modalGalleryFigure.appendChild(modalGalleryImg)

    deleteWorkBtn.addEventListener("click", async event => {
        let idToDelete = event.target.getAttribute("data-id")
        try {
            let response = await fetch(`http://localhost:5678/api/works/${idToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.ok) {
                document.querySelectorAll(`[data-id="${idToDelete}"]`).forEach(element => {
                    element.remove()
                });
            }
            else { throw new Error("Une erreur est survenue lors de la suppression d'un des travaux") }
        } catch (error) { alert(error.message) }
    })

    return modalGalleryFigure
}

export default function generateDeleteWorkModal(worksArray) {

    let deleteWorkModal = document.createElement("dialog")
    deleteWorkModal.setAttribute("id", "delete-work-modal")
    deleteWorkModal.classList.add("modal")

    let modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container")
    deleteWorkModal.appendChild(modalContainer)

    let closeDeleteWorkModalBtn = document.createElement("i")
    closeDeleteWorkModalBtn.classList.add("fa-solid", "fa-xmark", "close-modal")
    deleteWorkModal.appendChild(closeDeleteWorkModalBtn)

    let deleteWorkModalTitle = document.createElement("h3")
    deleteWorkModalTitle.textContent = "Galerie photo"
    modalContainer.appendChild(deleteWorkModalTitle)

    let deleteWorkModalGallery = document.createElement("div")
    deleteWorkModalGallery.classList.add("modal-gallery")
    modalContainer.appendChild(deleteWorkModalGallery)

    worksArray.forEach(work => {
        const modalWork = generateModalWork(work)
        deleteWorkModalGallery.appendChild(modalWork)
    });

    let addWorkBtn = document.createElement("span")
    addWorkBtn.classList.add("cta-btn")
    addWorkBtn.textContent = "Ajouter une photo"
    modalContainer.appendChild(addWorkBtn)
    addWorkBtn.addEventListener("click", () => {
        deleteWorkModal.close()
        document.querySelector("#add-work-modal form").reset()
        document.getElementById("nullCategory").selected = true
        if (document.querySelector(".form-img-container img")) {
            document.querySelector(".form-img-container img").remove()
            document.querySelector(".form-img-container").childNodes.forEach(element => {
                element.removeAttribute("style")
                element.removeAttribute("aria-hidden")
            });
        }
        document.getElementById("add-work-modal").showModal()
    })
    document.querySelector("main").appendChild(deleteWorkModal)
}