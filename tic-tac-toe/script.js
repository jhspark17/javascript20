const container = document.getElementById("container")
const spots = document.querySelectorAll('.spot');
const winner = document.querySelector(".result");
const button = document.querySelector('button');
const board = document.getElementById("board");
const rows = document.querySelectorAll(".row");
const arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const rowsObj = {};
const colsObj = {};
const diagObj = {};
let player = true;
let length = 0;
let total = 0;

function initialize(rows = 0){
  total = rows * rows;
  length = rows;
  for (let i = 0; i < rows; i++) {
    let div = document.createElement("div");
    div.classList.add("row")
    div.setAttribute("id", arr[i]);
    container.appendChild(div);
  }
  let tempRows = document.querySelectorAll(".row");
  tempRows.forEach((row => {
    for (let i = 0; i < rows; i++) {
      let div = document.createElement("div");
      div.classList.add("spot")
      div.setAttribute("id", `${i}`);
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
  return checkWinner(row, +col.id) ? true : false;
}

function checkWinner(row, col) {
  player ? rowsObj[row]++ : rowsObj[row]--;
  player ? colsObj[col]++ : colsObj[col]--;
  if (row === col) player ? diagObj.left++ : diagObj.left--;
  if ((row === length - 1 - col && col === length - 1 - row)) player ? diagObj.right++ : diagObj.right--;
  return Math.abs(rowsObj[row]) === length || Math.abs(colsObj[col]) === length ||Math.abs(diagObj.left) === length || Math.abs(diagObj.right) === length
}


function clearBoard(rows){
  while (container.hasChildNodes()) container.removeChild(container.lastChild);
  winner.innerHTML = "";
  player = true;
  initialize(rows)
}

function endGame() {
  const span = document.createElement('span');
  const person = player ? "X" : "O";
  span.innerHTML = !total ? `It's a Tie` : `${person} is the winner`
  span.classList.add(!total ? 'tie' : person);
  winner.appendChild(span)
  return;
}

board.addEventListener('change', e => (clearBoard(+e.target.value)));
button.addEventListener('click', e => (clearBoard(length)))
container.addEventListener('click', e => {
  if (winner.innerHTML || e.target.hasChildNodes()) return;
  if (addElement(arr.indexOf(e.target.parentElement.id), e.target) || !total) return endGame();
  player = !player;
})

