const xClass = 'x'
const circleClass = 'circle'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const finalScoreElement = document.getElementById('finalScore')
const restartButton = document.getElementById('restartButton')
const finalScoreTextElement = document.querySelector('[data-final-score]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) // last part - can click a specific cell only once
    })
    setBoardHoverClass()
    finalScoreElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass
    // placing a mark
    placeMark(cell, currentClass)
    // check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } 
    // check for draw 
     else if (isDraw()) {
        endGame(true)
    }  // switching turns
    else  {
        swapTurns()
        setBoardHoverClass()
    }
    
}

function endGame(draw) {
    if (draw) {
        finalScoreTextElement.innerText = 'Draw!'
    } else {
        finalScoreTextElement.innerText = `${circleTurn ? "Circle" : "X"} Wins!`
    }
    finalScoreElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

// hovering over cell, x and circle will pop up
function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if (circleTurn) {
        board.classList.add(circleClass)
    } else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}