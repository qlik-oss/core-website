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
    });

    this.addEventListener('mouseout', () => {
      this.value = this.value;
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
