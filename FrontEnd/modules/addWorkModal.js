import { generateGalleryWork } from "./gallery.js"
import { generateModalWork } from "./deleteWorkModal.js"

export default function generateAddWorkModal(worksCategories) {

    //création de la modale
    let addWorkModal = document.createElement("dialog")
    addWorkModal.setAttribute("id", "add-work-modal")
    addWorkModal.classList.add("modal")

    //création de la croix pour fermer
    let closeAddWorkModalBtn = document.createElement("i")
    closeAddWorkModalBtn.classList.add("fa-solid", "fa-xmark", "close-modal")
    addWorkModal.appendChild(closeAddWorkModalBtn)

    //création de la flèche pour revenir en arrière
    let returnBtn = document.createElement("i")
    returnBtn.classList.add("fa-solid", "fa-arrow-left", "return-modal")
    addWorkModal.appendChild(returnBtn)
    returnBtn.addEventListener("click", () => {
        addWorkModal.close()
        document.getElementById("delete-work-modal").showModal()
    })

    //création du contenu de la modale (formulaire)
    let modalContainer = document.createElement("div")
    modalContainer.classList.add("modal-container")
    addWorkModal.appendChild(modalContainer)
    //titre de la modale
    let addWorkModalTitle = document.createElement("h3")
    addWorkModalTitle.textContent = "Ajout photo"
    modalContainer.appendChild(addWorkModalTitle)
    //formulaire
    let addWorkForm = document.createElement("form")
    addWorkForm.method = "post"
    addWorkForm.enctype = "multipart/form-data"
    modalContainer.appendChild(addWorkForm)
    //container pour l'input image
    let addImgContainer = document.createElement("div")
    addImgContainer.classList.add("form-img-container")
    addWorkForm.appendChild(addImgContainer)
    //icone image
    let addWorkImgIcon = document.createElement("i")
    addWorkImgIcon.classList.add("fa-regular", "fa-image", "fa-5x")
    addImgContainer.appendChild(addWorkImgIcon)
    //label image
    let addworkImg = document.createElement("label")
    addworkImg.classList.add("add-work-img-btn")
    addworkImg.textContent = "+ Ajouter photo"
    addworkImg.setAttribute("for", "add-work-img")
    addImgContainer.appendChild(addworkImg)
    //input file de l'image
    let addWorkInput = document.createElement("input")
    addWorkInput.name = "imageUrl"
    addWorkInput.required = true
    addWorkInput.accept = ".jpg, .jpeg, .png"
    addWorkInput.type = "file"
    addWorkInput.id = "add-work-img"
    addImgContainer.appendChild(addWorkInput)
    //gestion de la taille max de l'image et du changement de l'UI une fois l'image sélectionnée
    addWorkInput.addEventListener("change", () => {
        if (addWorkInput.files[0].size > 1024 * 1024 * 4) {
            alert("L'image sélectionnée est trop lourde")
            return
        }
        else if (addWorkInput.files[0]) {
            addImgContainer.childNodes.forEach(element => {
                element.style.display = "none"
                element.setAttribute("aria-hidden", "true")
            });
            let imagePreview = document.createElement("img")
            imagePreview.classList.add("image-preview")
            imagePreview.src = URL.createObjectURL(addWorkInput.files[0])
            imagePreview.alt = "nouvelle image sélectionnée"
            addImgContainer.appendChild(imagePreview)
        }
    });
    //info sur la taille max
    let ImgInfo = document.createElement("span")
    ImgInfo.textContent = "jpg, png : 4mo max"
    addImgContainer.appendChild(ImgInfo)
    //label du titre
    let titleLabel = document.createElement("label")
    titleLabel.setAttribute("for", "work-title")
    titleLabel.textContent = "Titre"
    addWorkForm.appendChild(titleLabel)
    //input du titre
    let titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.name = "title"
    titleInput.id = "work-title"
    titleInput.required = true
    addWorkForm.appendChild(titleInput)
    //label de la catégorie
    let categoryLabel = document.createElement("label")
    categoryLabel.setAttribute("for", "work-category")
    categoryLabel.textContent = "Catégorie"
    addWorkForm.appendChild(categoryLabel)
    //selection de la categorie
    let categorySelection = document.createElement("select")
    categorySelection.name = "category"
    categorySelection.id = "work-category"
    categorySelection.required = true
    addWorkForm.appendChild(categorySelection)
    //initialisation d'une case vide pour les options de catégorie
    let nullCategory = document.createElement("option")
    nullCategory.id = "nullCategory"
    nullCategory.disabled = true
    categorySelection.appendChild(nullCategory)
    //création des options en fonction des worksCategories fetch dans l'index
    worksCategories.forEach(category => {
        let categoryOption = document.createElement("option")
        categoryOption.value = category.id
        categoryOption.textContent = category.name
        categorySelection.appendChild(categoryOption)
    });
    //div cosmétique
    let line = document.createElement("div")
    line.classList.add("line")
    line.setAttribute("aria-hidden", true)
    addWorkForm.appendChild(line)
    //bouton de validation du formulaire
    let submitWorkBtn = document.createElement("button")
    submitWorkBtn.setAttribute("id", "invalid-form")
    submitWorkBtn.disabled = true
    submitWorkBtn.classList.add("cta-btn")
    submitWorkBtn.textContent = "Valider"
    addWorkForm.appendChild(submitWorkBtn)
    //finalisation de la création de la modale
    document.querySelector("main").appendChild(addWorkModal)

    //gestion de la validation du formulaire
    document.querySelector("#add-work-modal").addEventListener("change", () => {
        if (categorySelection.validity.valid
            && titleInput.validity.valid
            && addWorkInput.validity.valid
            && titleInput.value.trim() !== "") {
            submitWorkBtn.setAttribute("id", "valid-form")
            submitWorkBtn.disabled = false
        }
        else {
            submitWorkBtn.setAttribute("id", "invalid-form")
            submitWorkBtn.disabled = true
        }
    });

    //gestion de l'envoi d'un nouveau work et mise & jour du site dynamique
    document.querySelector("#add-work-modal form").addEventListener("submit", async event => {
        event.preventDefault()

        let payload = new FormData()
        payload.append("image", addWorkInput.files[0])
        payload.append("title", titleInput.value.trim())
        payload.append("category", categorySelection.value)

        try {
            let response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: payload
            })
            if (response.ok) {
                let newWork = await response.json()
                addWorkModal.close()
                document.querySelector("#portfolio .gallery").appendChild(generateGalleryWork(newWork))
                document.querySelector(".modal-gallery").appendChild(generateModalWork(newWork))
            }
            else { throw new Error("Une erreur est survenue lors de l'envoi de travaux") }
        } catch (error) { alert(error.message) }
    })
}