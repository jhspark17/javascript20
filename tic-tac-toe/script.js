const container = document.getElementById("container")
const spots = document.querySelectorAll('.spot');
const winner = document.querySelector(".result");
const button = document.querySelector('button');
const rows = document.querySelectorAll(".row");
const arr = ["zero", "one", "two"];
const rowsObj = {};
const colsObj = {};
const diagObj = {};
let player = true;
let total = 9;

function initialize(){
  for (let i = 0; i < 3; i++) {
    rowsObj[i] = 0;
    colsObj[i] = 0;
  }
  diagObj.left = 0;
  diagObj.right = 0;
}

function addElement(row, col){
  const span = document.createElement('span');
  const mark = player ? "X" : "O";
  col.classList.add('selected');
  span.classList.add(mark);
  span.innerHTML = mark;
  col.appendChild(span);
  total--;
  return checkWinner(row, +col.id) ? true : false;
}

function checkWinner(row, col) {
  player ? rowsObj[row]++ : rowsObj[row]--;
  player ? colsObj[col]++ : colsObj[col]--;
  if (row === col) player ? diagObj.left++ : diagObj.left--;
  if (row === 1 && col === 1) player ? diagObj.right++ : diagObj.right--;
  if ((row === 0 && col === 2) || (row === 2 && col === 0)) player ? diagObj.right++ : diagObj.right--;
  if (Math.abs(rowsObj[row]) === 3 || Math.abs(colsObj[col]) === 3) return true;
  return Math.abs(diagObj.left) === 3 || Math.abs(diagObj.right) === 3 ? true : false;
}


function clearBoard(){
  spots.forEach(spot => {
    if (spot.hasChildNodes()) {
      spot.classList.remove('selected');
      spot.removeChild(spot.childNodes[0]);
    }
  })
  winner.innerHTML = "";
  player = true;
  initialize();
  total = 9;
}

function endGame() {
  const span = document.createElement('span');
  const person = player ? "X" : "O";
  span.innerHTML = !total ? `It's a Tie` : `${person} is the winner`
  span.classList.add(!total ? 'tie' : person);
  winner.appendChild(span)
  return;
}

button.addEventListener('click', (e) => (clearBoard()))

container.addEventListener('click', (e) => {
  if (winner.innerHTML || e.target.hasChildNodes()) return;
  if (addElement(arr.indexOf(e.target.parentElement.id), e.target) || !total) return endGame();
  player = !player;
})

initialize();