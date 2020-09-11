function getElementScrollPos(el) {
    const element = document.querySelector(el);
    return {
        X: element.scrollLeft,
        Y: element.scrollTop,
    }
}

function setElementScrollPos(el, scrollPos) {
    const element = document.querySelector(el);
    element.scrollTo({
        top: scrollPos.Y,
        left: scrollPos.X,
        behavior: 'smooth'
    })
}

export {
    getElementScrollPos,
    setElementScrollPos
}