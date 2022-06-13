const patientButtonElement = document.querySelector('.patient');
const docButtonElement = document.querySelector('.doc');

patientButtonElement.addEventListener('click', function () {
  const userEmailInputValue = document.querySelector('input').value;
  console.log(userEmailInputValue);
  localStorage.setItem('userInputEmailValue', userEmailInputValue);
});

docButtonElement.addEventListener('click', function () {
  const userEmailInputValue = document.querySelector('input').value;
  console.log(userEmailInputValue);
  localStorage.setItem('userInputEmailValue', userEmailInputValue);
});
