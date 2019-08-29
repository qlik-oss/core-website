var box = document.querySelector("#submitform");

document.addEventListener("mousedown", function (event) {
  if (document.getElementsByClassName("submitform")[0].classList[1] != "show") return;
  if (event.target.closest("#container")) return;
  document.getElementsByClassName("submitform")[0].classList.toggle("show")
});

function submitForm() {

  if (document.activeElement.form === undefined) {
    if (ev.keyCode === 70 || ev.keyCode === 83) {
      query.focus()
      ev.preventDefault()
    }
  }

  document.getElementsByClassName("submitform")[0].classList.toggle("show")
}
