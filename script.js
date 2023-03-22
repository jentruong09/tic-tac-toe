const xClass = 'x'
const circleClass = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true }) // last part - can click a specific cell only once
})

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    // placing a mark
    placeMark(cell, currentClass)
    // check for win

    // check for draw

    // switching turns
    swapTurns()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}