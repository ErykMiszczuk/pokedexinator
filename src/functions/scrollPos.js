function getScrollPos(el) {
    const element = document.querySelector(el);
    return {
        X: element.scrollLeft,
        Y: element.scrollTop,
    }
}

function setScrollPos(el, scrollPos) {
    const element = document.querySelector(el);
    element.scrollTo({
        top: scrollPos.Y,
        left: scrollPos.X,
        behavior: 'smooth'
    })
}

export {
    getScrollPos,
    setScrollPos
}