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
    span.classList.add("x");
    ele.appendChild(span);
  } else {
    span.innerHTML = "O";
    span.classList.add("o");
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
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let cols = Object.values(rows).slice(0, 3);
  for (let i = 0; i < cols.length; i++) {
    let col = cols[i].childNodes;
    for (let j = 1; j <= 5; j += 2) {
      console.log(col[j])
      
    }
  }
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
  if (winner === 3) return "Player 1"
  if (winner === -3) return "Player 2";
  else return "";
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
    let ele = addElement(e.target)
    if (typeof ele === "string") {
      winner.innerHTML = `${ele} is the winner`
    } 
    if (!total) {
      winner.innerHTML = "It's a tie"
    }
})