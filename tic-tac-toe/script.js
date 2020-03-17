const container = document.getElementById("container")
const button = document.querySelector('button');
const rows = document.querySelectorAll(".row")
const spots = document.querySelectorAll('.spot');
const winner = document.querySelector(".result");
const arr = ["zero", "one", "two"];
const rowsObj = {};
const colsObj = {};
const diagObj = {};
let player = true;
let total = 9

function initialize(){
  for (let i = 0; i < 3; i++) {
    rowsObj[i] = 0;
    colsObj[i] = 0;
  }
  diagObj.left = 0;
  diagObj.right = 0;
}

function addElement(row, col){
  total--
  let span = document.createElement('span');
  let mark = player ? "X" : "O";
  col.classList.add('selected');
  span.innerHTML = mark;
  span.classList.add(mark);
  col.appendChild(span);
  return checkWinner(row, +col.id) ? true : false;
}

function checkWinner(row, col) {
  player ? rowsObj[row]++ : rowsObj[row]--
  if (Math.abs(rowsObj[row]) === 3) return true
  player ? colsObj[col]++ : colsObj[col]--
  if (Math.abs(colsObj[col]) === 3) return true;
  if (row === col) {
    player ? diagObj.left++ : diagObj.left--;
    if (row === 1) player ? diagObj.right++ : diagObj.right--;
  } 
  if ((row === 0 && col === 2) || (row === 2 && col === 0)) player ? diagObj.right++ : diagObj.right--;
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
  total = 9;
  player = true;
  initialize();
}

function endGame() {
  const person = player ? "X" : "O";
  const span = document.createElement('span');
  span.classList.add(person);
  span.innerHTML = `${person} is the winner`
  winner.appendChild(span)
  return;
}

function tie() {
  const span = document.createElement('span');
  span.classList.add('tie');
  span.innerHTML = `It's a Tie`
  winner.appendChild(span)
  return;
}

button.addEventListener('click', (e) => (clearBoard()))

container.addEventListener('click', (e) => {
  if (winner.innerHTML) return;
  if (e.target.hasChildNodes()) return;
  if (addElement(arr.indexOf(e.target.parentElement.id), e.target)) return endGame();
  if (!total) return tie()
  player = !player;
})

initialize();