const deck = document.getElementById("deck");
const sizeSlider = document.getElementById("sizeSlider");
const suitSelect = document.getElementById("suitSelect");
const resetBtn = document.getElementById("resetBtn");
const faces = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A"
];
const total = faces.length;
const angleSpread = 90;
const startAngle = -angleSpread / 2;
let cardElements = [];

function createCards() {
	deck.innerHTML = "";
	cardElements = [];
	const size = parseInt(sizeSlider.value);
	const suit = suitSelect.value;
	const color = suit === "♥" || suit === "♦" ? "red" : "black";
	faces.forEach((face, i) => {
		const card = document.createElement("div");
		card.className = "card";
		card.style.width = `${size}px`;
		card.style.height = `${size * 1.4}px`;
		const angle = startAngle + (angleSpread / (total - 1)) * i;
		gsap.set(card, {
			x: 0,
			y: 0,
			rotation: angle
		});
		const inner = document.createElement("div");
		inner.className = "card-inner";
		inner.innerHTML = `
        <div class="card-front" style="color:${color}">
          <div class="corner top-left">${face}<br>${suit}</div>
          <div class="center-suit">${suit}</div>
          <div class="corner bottom-right">${face}<br>${suit}</div>
        </div>
        <div class="card-back"></div>
      `;
		card.appendChild(inner);
		deck.appendChild(card);
		cardElements.push({
			card,
			angle
		});
		Draggable.create(card, {
			type: "x,y",
			inertia: true,
			edgeResistance: 0.65,
			bounds: document.body
		});
		card.addEventListener("dblclick", () => {
			card.classList.toggle("flipped");
		});
	});
}
// Initial render
createCards();
// Events
sizeSlider.addEventListener("input", createCards);
suitSelect.addEventListener("change", createCards);
const randomizeBtn = document.getElementById("randomizeBtn");
randomizeBtn.addEventListener("click", () => {
	cardElements.forEach(({ card }, index) => {
		const randX = Math.random() * 400 - 200; // between -200 and +200 px
		const randY = Math.random() * 300 - 150; // between -150 and +150 px
		const randRotation = Math.random() * 360 - 180; // between -180 and +180 deg
		gsap.to(card, {
			x: randX,
			y: randY,
			rotation: randRotation,
			duration: 0.5,
			ease: "power2.inOut"
		});
		card.style.zIndex = index; // preserve stacking order
	});
});
resetBtn.addEventListener("click", () => {
	cardElements.forEach(({ card, angle }, index) => {
		gsap.to(card, {
			x: 0,
			y: 0,
			rotation: angle,
			duration: 0.5,
			ease: "power2.out"
		});
		card.style.zIndex = index;
	});
});
