var box = document.querySelector("#submitform");

document.addEventListener("click", function (event) {
  if (event.target.closest("#container")) return;
  document.getElementById("submitform").style.display = 'none';
});

function submitForm() {

  if (document.activeElement.form === undefined) {
    if (ev.keyCode === 70 || ev.keyCode === 83) {
      query.focus()
      ev.preventDefault()
    }
  }

  document.getElementById("submitform").style.display = 'none';
}
