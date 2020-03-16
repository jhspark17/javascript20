const container = document.getElementById("container");
const button = document.querySelector('button');
const selected = document.querySelectorAll('div.selected.spot');



function addElement(ele){
  let span = document.createElement('span');
  span.innerHTML = "X";
  span.classList.add("x");
  ele.classList.add("selected")
  console.log(ele)
  ele.appendChild(span);
}

function clearBoard(){
  console.log(selected)
}








button.addEventListener('click', (e) => {
  clearBoard();
})

container.addEventListener('click', (e) => {
    if (e.target.hasChildNodes()) return;
    addElement(e.target)
  
})