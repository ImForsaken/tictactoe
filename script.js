let fields = [];
let currentShape = 'cross';
let gameOver = false;


function changePlayerNames() {
    let name1 = document.getElementById('inputPlayer1').value;
    let name2 = document.getElementById('inputPlayer2').value;
    if (name1 == '' || name2 == '') {
        alert('Bitte Spielername eingeben');
    } else if (name1 == name2) {
        alert('Bitte nicht die selben Namen eingeben');
    } else {
        document.getElementById('playerName1').innerHTML = `${name1}`;
        document.getElementById('playerName2').innerHTML = `${name2}`;
        document.getElementById('startScreen').classList.add('d-none');
    }
}

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player1').classList.add('playerInactive');
            document.getElementById('player2').classList.remove('playerInactive');
        } else {
            currentShape = 'cross';
            document.getElementById('player1').classList.remove('playerInactive');
            document.getElementById('player2').classList.add('playerInactive');
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function draw() { //reveals symbol after select field
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross' + i).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    let winner;
    //Horizontallly
    if (checkHFirstLineForWin()) {
        winner = fields[0];
        document.getElementById('line0').style.transform = 'scaleX(1)';
    }

    if (checkHSecondLineForWin()) {
        winner = fields[3];
        document.getElementById('line1').style.transform = 'scaleX(1)';
    }

    if (checkHThirdLineForWin()) {
        winner = fields[6];
        document.getElementById('line2').style.transform = 'scaleX(1)';
    }

    //Vertical
    if (checkVFirstLineForWin()) {
        winner = fields[0];
        document.getElementById('line3').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (checkVSecondLineForWin()) {
        winner = fields[1];
        document.getElementById('line4').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (checkVThirdLineForWin()) {
        winner = fields[2];
        document.getElementById('line5').style.transform = 'rotate(90deg) scaleX(1)';
    }

    //diagonally
    if (checkDFirstLineForWin()) {
        winner = fields[0];
        document.getElementById('line6').style.transform = 'rotate(45deg) scaleX(1)';

    }

    if (checkDSecondLineForWin()) {
        winner = fields[2];
        document.getElementById('line7').style.transform = 'rotate(-45deg) scaleX(1)';
    }

    if (winner) {
        displayWinner(winner);
    }
}





function displayWinner(winner) {
    gameOver = true;
    setTimeout(() => {
        document.getElementById('gameOver').classList.remove('d-none');
        document.getElementById('restartButton').classList.remove('d-none');
        document.getElementById('winnerScreen').classList.remove('d-none');
        checkWinnerName(winner);
    }, 1000);
}

function checkWinnerName(winner) {
    if (winner == "circle") {
        let circle = document.getElementById('inputPlayer1').value;
        document.getElementById('winnerScreen').innerHTML = `Der Gewinner ist<br> ${circle}`;
    } else {
        let cross = document.getElementById('inputPlayer2').value;
        document.getElementById('winnerScreen').innerHTML = `Der Gewinner ist<br> ${cross}`;
    }
}

function restartGame() {
    fields = [];
    gameOver = false;
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('restartButton').classList.add('d-none');
    document.getElementById('winnerScreen').classList.add('d-none');
    for (let j = 0; j < 8; j++) {
        document.getElementById('line' + j).style.transform = ('scaleX(0)');
    }
    for (let i = 0; i < 9; i++) {
        document.getElementById('cross' + i).classList.add('d-none');
        document.getElementById('circle' + i).classList.add('d-none');
    }
}


//Check fields condition


//Check Horizontal lines
function checkHFirstLineForWin() {
    return fields[0] == fields[1] && fields[1] == fields[2] && fields[0];
}

function checkHSecondLineForWin() {
    return fields[3] == fields[4] && fields[4] == fields[5] && fields[3];
}

function checkHThirdLineForWin() {
    return fields[6] == fields[7] && fields[7] == fields[8] && fields[6];
}

//Check Vertical lines
function checkVFirstLineForWin() {
    return fields[0] == fields[3] && fields[3] == fields[6] && fields[0];
}

function checkVSecondLineForWin() {
    return fields[1] == fields[4] && fields[4] == fields[7] && fields[1];
}

function checkVThirdLineForWin() {
    return fields[2] == fields[5] && fields[5] == fields[8] && fields[2];
}
//Check Diagonal lines
function checkDFirstLineForWin() {
    return fields[0] == fields[4] && fields[4] == fields[8] && fields[0];
}

function checkDSecondLineForWin() {
    return fields[2] == fields[4] && fields[4] == fields[6] && fields[2];
}