

let restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', restartGame);
let currentGamerDisplay = document.querySelector('#current-gamer');
let cells = getFieldCells('#field td');
let currentGamer = setDefaultGamer();

prepareField();

// получаем ячейки
function getFieldCells(selector) {
    return document.querySelectorAll(selector);
}
// готовим поле, привязываем событие ячейкам
// allow globals vars
function prepareField() {
    activateCell(cells);
    currentGamer = setDefaultGamer();

    showCurrentGamer(currentGamer, currentGamerDisplay);
}

// происходит событие: игрок делает ход
// allow globals vars
function nextStep() {
    getGamer(this, currentGamer);

    currentGamer = getNextGamer(currentGamer);
    
    showCurrentGamer(currentGamer, currentGamerDisplay);
    
    deactivateCell(this);
    
    
    let winner = checkWin(cells); // важно запускать после каждого хода
    if( winner != false) {
        endGame(cells, winner, currentGamerDisplay);
    } else {
        let isFilled = checkFieldIsFilled(cells);
        if(isFilled) {
            endGame(cells, winner, currentGamerDisplay);
        }
        
    }
}

// конец игры
function  endGame(cells, winner, currentGamerDisplay) {
    stopGame(cells);
    showWinner(winner);
    showCurrentGamer('-', currentGamerDisplay);
}
// перезагрузить игру
function restartGame() {
    prepareField(cells);
}

/* Вспомогательные функции */

// получить игрока
function getGamer(cell, content) {
    return cell.innerHTML = content;
}
// изменить игрока
function getNextGamer(currentGamer) {
    if (currentGamer == 'X') {
        return 'O';
    } else {
        return 'X';
    }
}
// активируем ячейки
function activateCell(cell) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', nextStep);
    }
}
// диактивируем ячейку
function deactivateCell(elem) {
    elem.removeEventListener('click', nextStep);
}




// отвязываем событие от ячеек
function stopGame(cells) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', nextStep);
    }
}
// устанавливаем первого игрока 'X'
function setDefaultGamer() {
    return 'X';
}

// вернет false = ничья  Х или О при победе
function checkWin(cells) {
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let wc = winningCombinations[i];

        if (cells[wc[0]].innerHTML == cells[wc[1]].innerHTML &&
            cells[wc[1]].innerHTML == cells[wc[2]].innerHTML &&
            cells[wc[0]].innerHTML != '') {
            // вернем победителя. любую ячейку
            return cells[wc[0]].innerHTML;
        }
    }
    return false;
}
// проверка на ничью
function checkFieldIsFilled(cells) {
    
    for (let i = 0; i < cells.length; i++) {
        if(cells[i].innerHTML == '') {
            return false;
        }
    }
    return true;
}

function showWinner(winner) {
    if(winner !== false) {
        alert(winner);
    } else {
        alert('draw');
    }
    
}
function showCurrentGamer(name, elem) {
    
    elem.innerHTML = name;
}