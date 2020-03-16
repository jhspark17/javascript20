const container = document.getElementById("container");
const button = document.querySelector('button');
const rows = document.querySelectorAll(".row")
const spots = document.querySelectorAll('.spot');
const winner = document.querySelector(".result");
let player = true;
let total = 9

function addElement(ele){
  total--
  let span = document.createElement('span');
  ele.classList.add('selected');
  if (player) {
    span.innerHTML = "X";
    span.classList.add("X");
    ele.appendChild(span);
  } else {
    span.innerHTML = "O";
    span.classList.add("O");
    ele.appendChild(span)
  }
  if (checkWinner()) {
    if (player) return "X";
    else return "O";
  } else player = !player
}

function checkWinner() {
  let fin = ""
  rows.forEach((row) => {
    let winner = checkRow(row);
    if (winner) fin = winner;
  })
  if (fin) return fin;
  fin = checkColumns(rows);
  if (fin) return fin;
}

function checkColumns(rows) {
  let arr = [[], [], []];
  let cols = Object.values(rows).slice(0, 3);
  for (let i = 0; i < cols.length; i++) {
    let col = cols[i].childNodes;
    for (let j = 1; j <= 5; j += 2) {
      if (j === 1) {
        arr[0].push(col[j].classList.contains("selected") ? col[j].childNodes[0].innerHTML : " ");
      }
      if (j === 3) {
        arr[1].push(col[j].classList.contains("selected") ? col[j].childNodes[0].innerHTML : " ")
      }
      if (j === 5) {
        arr[2].push(col[j].classList.contains("selected") ? col[j].childNodes[0].innerHTML : " ")
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    let winner = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === "X") winner++;
      if (arr[i][j] === "O") winner--;
    }
    if (winner === 3) return true;
    if (winner === -3) return true;
  }
  let arr2 = [[], [], []]
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      arr2[i].push(arr[j][i]);
    }
  }

  if (checkDiag(arr)) return true;
  return false;
}

function checkDiag(arr) {
  let winner = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][i] === "X") winner++;
    if (arr[i][i] === "O") winner--;
  }
  if (winner === 3 || winner === -3) return true;
  winner = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[arr.length - 1 - i][i] === "X") winner++;
    if (arr[arr.length - 1 - i][i] === "O") winner--;
  }
  if (winner === 3 || winner === -3) return true;
  return false;
}

function checkRow(row) {
  let winner = 0;
  let nodes = row.children;
  let arr = [...Object.values(nodes)].slice(0, 4);
  for (let i = 0; i < arr.length; i++) {
    let ele = arr[i];
    if (ele.classList.contains('selected')) {
      ele.childNodes[0].innerHTML === "X" ? winner++ : winner--;
    }
  }
  if (winner === 3) return true
  if (winner === -3) return true;
  else return false;
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
}


button.addEventListener('click', (e) => {
  clearBoard();
})

container.addEventListener('click', (e) => {
  if (winner.innerHTML) return;
  if (e.target.hasChildNodes()) return;
  if (addElement(e.target)) {
    let person = player ? "X" : "O";
    let span = document.createElement('span');
    span.classList.add(person);
    span.innerHTML = `${person} is the winner`
    winner.appendChild(span)
  } 
  if (!total) {
    winner.innerHTML = "It's a tie"
  }
})