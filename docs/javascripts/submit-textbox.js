function submitForm() {

  if (document.activeElement.form === undefined) {
    if (ev.keyCode === 70 || ev.keyCode === 83) {
      query.focus()
      ev.preventDefault()
    }
  }

  var op = 1
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      document.getElementById("textbox").style.display = 'none';
    }
    document.getElementById("textbox").style.opacity = op;
    document.getElementById("textbox").style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.5;
  }, 50);

  setTimeout(() => (document.getElementById("textAfter").style.display = 'block'), 250);
}
