function generateWork(work) {
    let workFigure = document.createElement("figure")
    workFigure.setAttribute("data-category", work.category.name);
    workFigure.innerHTML = "<img src=\"" + work.imageUrl + "\" alt=\"" + work.title + "\"><figcaption>" + work.title + "</figcaption>"
    document.querySelector(".gallery").appendChild(workFigure)
}

export default function generateGallery(worksArray) {
    worksArray.forEach(work => {
        generateWork(work)
    })
}