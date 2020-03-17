const zero = document.getElementById("zero")
const one = document.getElementById("one")
const two = document.getElementById("two")
const button = document.querySelector('button');
const rows = document.querySelectorAll(".row")
const spots = document.querySelectorAll('.spot');
const winner = document.querySelector(".result");
const rowsObj = {};
const colsObj = {};
const diagsObj = {};
let player = true;
let total = 9
const arr = ["zero", "one", "two"];


function initialize(){
  for (let i = 0; i < 3; i++) {
    rowsObj[i] = 0;
    colsObj[i] = 0;
  }
  diagsObj.left = 0;
  diagsObj.right = 0;
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
  num = arr.indexOf(row);
  console.log(num, col)
  player ? rowsObj[num]++ : rowsObj[num]--
  if (Math.abs(rowsObj[num]) === 3) return true
  return checkColumns(num, col) ? true : false;
}

function checkColumns(row, col) { 
  player ? colsObj[col]++ : colsObj[col]--
  if (Math.abs(colsObj[col]) === 3) return true;
  if (row === col) {
    player ? diagsObj.left++ : diagsObj.left--;
    if (row === 1) player ? diagsObj.right++ : diagsObj.right--;
  } 
  if (row === 0 && col === 2) player ? diagsObj.right++ : diagsObj.right--;
  if (row === 2 && col === 0) player ? diagsObj.right++ : diagsObj.right--;
  return Math.abs(diagsObj.left) === 3 || Math.abs(diagsObj.right) === 3 ? true : false;
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


button.addEventListener('click', (e) => {
  clearBoard();
})

zero.addEventListener('click', (e) => {
  if (winner.innerHTML) return;
  if (e.target.hasChildNodes()) return;
  if (addElement(e.currentTarget.id, e.target)) {
    const person = player ? "X" : "O";
    const span = document.createElement('span');
    span.classList.add(person);
    span.innerHTML = `${person} is the winner`
    winner.appendChild(span)
    return;
  } 
  if (!total) {
    const span = document.createElement('span');
    span.classList.add('tie');
    span.innerHTML = `It's a Tie`
    winner.appendChild(span)
    return;
  }
  player = !player;
})

one.addEventListener('click', (e) => {
  if (winner.innerHTML) return;
  if (e.target.hasChildNodes()) return;
  if (addElement(e.currentTarget.id, e.target)) {
    const person = player ? "X" : "O";
    const span = document.createElement('span');
    span.classList.add(person);
    span.innerHTML = `${person} is the winner`
    winner.appendChild(span)
    return;
  } 
  if (!total) {
    const span = document.createElement('span');
    span.classList.add('tie');
    span.innerHTML = `It's a Tie`
    winner.appendChild(span)
    return;
  }
  player = !player;
})

two.addEventListener('click', (e) => {
  if (winner.innerHTML) return;
  if (e.target.hasChildNodes()) return;
  if (addElement(e.currentTarget.id, e.target)) {
    const person = player ? "X" : "O";
    const span = document.createElement('span');
    span.classList.add(person);
    span.innerHTML = `${person} is the winner`
    winner.appendChild(span)
    return;
  } 
  if (!total) {
    const span = document.createElement('span');
    span.classList.add('tie');
    span.innerHTML = `It's a Tie`
    winner.appendChild(span)
    return;
  }
  player = !player;
})

initialize();