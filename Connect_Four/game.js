var player1 = prompt("Player One: Enter your name, you will be blue");
var player1color = 'rgb(86, 151, 255)'

var player2 = prompt("Player Two: Enter your name, you will be blue");
var player2color = 'rgb(237, 45, 73)'

var game_on = true;
var table = $('table tr');



function changeColor(rowIndex,colIndex,color) {
      return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)
}

function returnColor(rowIndex,colIndex) {
      return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row>=0; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four) {
  return (one===two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

//check for horizontal win
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0;col < 4 ; col++) {
      if (colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))) {
        console.log('Horizontal Win');
        console.log('Congratulations ' + currentName);
        return true
      }else {
        continue;
      }
    }
  }
}

// check for vertical Win
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('Vertical Win');
        console.log('Congratulations ' + currentName);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))){
        console.log('Diagonal Win');
        console.log('Congratulations ' + currentName);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('Diagonal Win');
        console.log('Congratulations ' + currentName);
        return true;
      }else {
        continue;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h3').text(player1 + " it is your turn, pick a column to drop in!");

$('.board button').on('click', function functionName() {
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName + " You Won");
    $('h2').fadeOut(2000);
    $('h3').fadeOut(2000);
    $('.board').fadeOut(2000);
  }

  currentPlayer = currentPlayer * -1;
  if (currentPlayer===1) {
    currentName = player1;
    $('h3').text(currentName+ " it is your turn");
    currentColor = player1color;
  }else {
    currentName = player2;
    $('h3').text(currentName+ " it is your turn");
    currentColor = player2color;
  }


})
