const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const errors = {};

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector('small');
  small.innerText = message
}

function showSuccess(input) {
  formControl = input.parentElement;
  formControl.classList.add("success");
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (!input.value.trim()) errors[input.id] = `${getFieldName(input)} is required`
  });
}

function checkLength(input, min, max) {
  if (errors[input.id]) return;
  else if (input.value.length < min) {
    errors[input.id] = `${getFieldName(input)} must be at least ${min} characters`
  } else if (input.value.length > max) {
    errors[input.id] = `${getFieldName(input)} must be less than ${max} characters`
  } 
}

function match(p1, p2) {
  if (p1.value !== p2.value) errors[p2.id] = `${getFieldName(p2)} must match ${getFieldName(p1)}`;
}

function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(input.value).toLowerCase())) {
    errors[input.id] = `${getFieldName(input)} is not valid`
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault()
  let arr = [username, email, password, password2]
  checkRequired(arr);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email)
  match(password, password2)

  arr.forEach(input => {
    if (errors[input.id]) showError(input, errors[input.id]);
    else showSuccess(input);
  })
})