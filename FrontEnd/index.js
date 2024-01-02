//recupere les données via l'API et les parse
let worksArray = await(await fetch("http://localhost:5678/api/works/")).json()
//const worksArray = await JSON.parse(await fetch("http://localhost:5678/api/works/"))
//DEMANDER POURQUOI LA LIGNE DU DESSUS NE FONCTIONNE PAS SI J'OUBLIE DE LIRE MES QUESTIONS

//import filters from "./modules/filters.js"
//import gallery from "./modules/gallery.js"

//création du set de catégories via la propriété name de la propriété category de chaque work pour eviter un call API
let categorySet = new Set(worksArray.map((work) => {
    return work.category.name
}))
//création du bouton reset des filtres qui servira d'ancres aux filtres
let resetBtn = document.createElement("button")
resetBtn.textContent = "Tous"
document.querySelector("#portfolio h2").parentNode.insertBefore(resetBtn, document.querySelector("#portfolio h2").nextSibling)
//création des boutons
categorySet.forEach(category => {
    let filterBtn = document.createElement("button")
    filterBtn.setAttribute("data-category", category)
    filterBtn.textContent = category
    resetBtn.parentNode.insertBefore(filterBtn, resetBtn.nextSibling)
});
//remplissage de la galerie avec chaque work qui a été fetch
worksArray.forEach(work => {
    let workFigure = document.createElement("figure")
    workFigure.setAttribute("data-category", work.category.name);
    workFigure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\"><figcaption>" + work.title + "</figcaption>"
    document.querySelector(".gallery").appendChild(workFigure)
})

//eventListener des filtres
document.querySelectorAll("#portfolio button").forEach(button => {
    button.addEventListener("click", event => {
        if (button.getAttribute("data-category") !== null) {
            document.querySelectorAll(".gallery figure").forEach(figure => {
                if (figure.getAttribute("data-category") === event.target.getAttribute("data-category")) {
                    figure.style.display = "inherit"
                } else {
                    figure.style.display = "none"
                }
            })
        } else {
            document.querySelectorAll(".gallery figure").forEach(figure => {
                figure.style.display = "inherit"
            });
        }
    })
})