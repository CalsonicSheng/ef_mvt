const dataCategoryList = document.querySelectorAll('.app-grid div');
const yourEmailInputValue = localStorage.getItem('userInputEmailValue');
const yourEmailElement = document.querySelector('.email');

yourEmailElement.value = yourEmailInputValue;

dataCategoryList.forEach(function (e) {
  e.addEventListener('click', function () {
    if (e.classList.length == 1) {
      e.classList.add('bubble-selected');
    } else {
      e.classList.remove('bubble-selected');
    }
  });
});
