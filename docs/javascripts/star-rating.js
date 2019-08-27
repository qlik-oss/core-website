class StarRating extends HTMLElement {

  get value() {
    return this.getAttribute('value') || 0;
  }

  set value(val) {
    this.setAttribute('value', val);
    this.highlight(this.value - 1);
  }

  get number() {
    return this.getAttribute('number') || 5;
  }

  set number(val) {
    this.setAttribute('number', val);
    this.stars = [];
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    for (let i = 0; i < this.number; i++) {
      let s = document.createElement('div');
      s.className = i + ' stars star';
      s.id = "Rating: " + (i + 1)
      this.appendChild(s);
      this.stars.push(s);
    }
    this.value = this.value;
  }

  message(index) {
    var popup = document.getElementById("myPopup");
    popup.classList.add("show");
    popup.style.display = 'block';
    switch (index) {
      case 1:
        document.getElementById("myPopup").innerHTML = "Documentation is awful"
        break;
      case 2:
        document.getElementById("myPopup").innerHTML = "Documentation is bad"
        break;
      case 3:
        document.getElementById("myPopup").innerHTML = "Documentation is ok"
        break;
      case 4:
        document.getElementById("myPopup").innerHTML = "Documentation is good"
        break;
      case 5:
        document.getElementById("myPopup").innerHTML = "Documentation is great"
        break;
    }
  }

  highlight(index) {
    this.stars.forEach((star, i) => {
      star.classList.toggle('full', i <= index);
    });
  }

  constructor() {
    super();
    this.number = this.number;

    this.addEventListener('mousemove', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
      this.highlight(starIndex);
      this.message(starIndex + 1)
    });

    this.addEventListener('mouseout', () => {
      this.value = this.value;
      document.getElementById("myPopup").style.display = 'none';
    });

    this.addEventListener('click', e => {
      document.getElementById("submitform").style.display = 'block';
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
      this.value = starIndex + 1;
      let rateEvent = new Event('rate');
      this.dispatchEvent(rateEvent);
    });
  }
}

customElements.define('x-star-rating', StarRating);
