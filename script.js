let cells = getFieldCells('#field td');
let currentGamer = 'X';

prepareField(cells);

// получаем ячейки
function getFieldCells(selector) {
    return document.querySelectorAll(selector);
}
// готовим поле, привязываем событие ячейкам
function prepareField(cells) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', nextStep);
    }
}

// происходит событие: игрок делает ход
function nextStep() {
    getGamer(this, currentGamer);

    currentGamer = getNextGamer(currentGamer);
   
    deactivateCell(this);
    
    let winner = checkWin(cells); // важно запускать после каждого хода
    if( winner != false) {
        endGame(cells);
    }
}
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

// диактивируем ячейку
function deactivateCell(elem) {
    elem.removeEventListener('click', nextStep);
}

// конец игры
function  endGame() {
    stopGame(cells)
}
// отвязываем событие от ячеек
function stopGame(cells) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', nextStep);
    }
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