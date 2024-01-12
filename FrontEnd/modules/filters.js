//création des boutons filtres
export default function generateFilters(worksArray) {
    //création du set de catégories via la propriété name de la propriété category de chaque work pour eviter un call API
    let categorySet = new Set(worksArray.map((work) => {
        return work.category.name
    }));
    //création du bouton reset des filtres qui servira d'ancres aux filtres
    let resetBtn = document.createElement("button");
    resetBtn.textContent = "Tous";
    document.querySelector("#portfolio h2").parentNode.insertBefore(resetBtn, document.querySelector("#portfolio h2").nextSibling)
    categorySet.forEach(category => {
        let filterBtn = document.createElement("button")
        filterBtn.setAttribute("data-category", category)
        filterBtn.textContent = category
        resetBtn.parentNode.insertBefore(filterBtn, resetBtn.nextSibling)
    });
    //eventListener des filtres
    document.querySelectorAll("#portfolio button").forEach(button => {
        button.addEventListener("click", event => {
            if (event.target.getAttribute("data-category") !== null) {
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
};