export default function generateFilters(worksCategories) {

    let galleryFilters = document.createElement("div")
    galleryFilters.id = "gallery-filters"
    document.getElementById("portfolio").insertBefore(galleryFilters, document.querySelector(".gallery"))

    let resetBtn = document.createElement("span")
    resetBtn.textContent = "Tous"
    resetBtn.id = "selected-filter"
    galleryFilters.appendChild(resetBtn)

    worksCategories.forEach(category => {
        let filterBtn = document.createElement("span")
        filterBtn.setAttribute("data-category", category.id)
        filterBtn.textContent = category.name
        galleryFilters.appendChild(filterBtn)
    });

    document.querySelectorAll("#portfolio span").forEach(filter => {
        filter.addEventListener("click", event => {
            document.getElementById("selected-filter").removeAttribute("id")
            event.target.id = "selected-filter"

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
}