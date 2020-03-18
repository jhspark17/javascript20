const arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const container = document.getElementById("container")
const spots = document.querySelectorAll('.spot');
const result = document.querySelector(".result");
const button = document.querySelector('button');
const board = document.getElementById("board");
const rows = document.querySelectorAll(".row");
const rowsObj = {};
const colsObj = {};
const diagObj = {};
let player = true;
let length = 0;
let total = 0;

function initialize(rows = 3){
  total = rows * rows;
  length = rows;
  let div;
  for (let i = 0; i < rows; i++) {
    div = document.createElement("div");
    div.setAttribute("id", arr[i]);
    div.classList.add("row")
    container.appendChild(div);
  }
  let tempRows = document.querySelectorAll(".row");
  tempRows.forEach((row => {
    for (let i = 0; i < rows; i++) {
      div = document.createElement("div");
      div.setAttribute("id", `${i}`);
      div.classList.add("spot")
      row.appendChild(div);
    }
  }))

  for (let i = 0; i < rows; i++) {
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
  return checkWinner(row, +col.id)
}

function checkWinner(row, col) {
  player ? rowsObj[row]++ : rowsObj[row]--;
  player ? colsObj[col]++ : colsObj[col]--;
  if (row === col) player ? diagObj.left++ : diagObj.left--;
  if (row === length - 1 - col && col === length - 1 - row) player ? diagObj.right++ : diagObj.right--;
  return Math.abs(rowsObj[row]) === length || Math.abs(colsObj[col]) === length ||Math.abs(diagObj.left) === length || Math.abs(diagObj.right) === length
}


function clearBoard(rows){
  while (container.hasChildNodes()) container.removeChild(container.lastChild);
  result.innerHTML = "";
  initialize(rows)
  player = true;
}

function endGame(winner) {
  const person = player ? "X" : "O";
  const span = document.createElement('span');
  span.innerHTML = winner ? `${person} is the winner` : `It's a Tie` ;
  span.classList.add(winner ? person : 'tie');
  result.appendChild(span);
}

board.addEventListener('change', e => (clearBoard(+e.target.value)));
button.addEventListener('click', e => (clearBoard(length)))
container.addEventListener('click', e => {
  if (result.innerHTML || e.target.hasChildNodes()) return;
  if (addElement(arr.indexOf(e.target.parentElement.id), e.target)) return endGame(true);
  if (!total) return endGame(false);
  player = !player;
})

initialize()
