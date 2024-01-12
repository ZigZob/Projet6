var worksArray = []
async function fetchWorks() {
    worksArray = await (await fetch("http://localhost:5678/api/works/")).json()
}
await fetchWorks()

import generateGallery from "./modules/gallery.js"
import generateFilters from "./modules/filters.js"

generateGallery(worksArray)
generateFilters(worksArray)