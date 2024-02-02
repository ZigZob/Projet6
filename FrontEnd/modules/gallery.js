function generateGalleryWork(work) {
    const workFigure = document.createElement("figure")
    const workFigcaption = document.createElement("figcaption")
    const workFigImg = document.createElement("img")
    workFigure.setAttribute("data-category", work.categoryId);
    workFigure.setAttribute("data-id", work.id)
    workFigImg.src = work.imageUrl
    workFigImg.alt = work.title
    workFigcaption.textContent = work.title
    workFigure.appendChild(workFigImg)
    workFigure.appendChild(workFigcaption)
    return workFigure
}

export default function generateGallery(worksArray) {
    worksArray.forEach(work => {
        const workFigure = generateGalleryWork(work)
        document.querySelector(".gallery").appendChild(workFigure)
    })
}

export { generateGalleryWork };