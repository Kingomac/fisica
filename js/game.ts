let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let imanes: Iman[];
let funcionando: boolean = false;

function start() {
  canvas = < HTMLCanvasElement > document.getElementById('game');
  if (canvas.style.display == "none") canvas.style.display = "block";
  canvas.scrollIntoView();
  canvas.style.border = "solid 2px black";
  ctx = canvas.getContext('2d');
  let width = 200;
  let height = 100;
  imanes = [new Iman(0, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, ctx)];
  canvas.onclick = function () {
    imanes.forEach((i) => {
      i.dividir();
    })
  }
  if (!funcionando) {
    update();
    funcionando = true;
  }
}

function update() {
  ctx.clearRect(0, 0, 1000, 1000);
  imanes.forEach((i) => {
    if (i.activo) i.dibujar();
  })
  requestAnimationFrame(update)
}

class Iman {
  id: number
  activo: boolean = true
  posicionN: Vector2
  posicionS: Vector2
  velocidad: Vector2
  width: number
  height: number
  dividido: boolean
  tiempo: number = 0
  ctx: CanvasRenderingContext2D
  constructor(id: number, x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.id = id;
    this.posicionN = new Vector2(x, y);
    this.posicionS = new Vector2(x + width / 2, y);
    this.velocidad = new Vector2(0.3, 0.1 * signoRandom());
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }
  dibujar() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.posicionN.x, this.posicionN.y, this.width / 2, this.height);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.posicionS.x, this.posicionS.y, this.width / 2, this.height);
    if (this.dividido) {
      this.posicionN.x -= this.velocidad.x;
      this.posicionN.y += this.velocidad.y;
      this.posicionS.x += this.velocidad.x;
      this.posicionS.y += this.velocidad.y;
    }
  }
  dividir() {
    if (imanes.length * 2 >= 8) start();
    if (!this.dividido) {
      this.dividido = true;
      setInterval(() => {
        if (this.activo) this.tiempo++;
      }, 1000);
      setTimeout(() => {
        convertirDosImanes(this.id);
      }, 3000)
    }
  }
}

function convertirDosImanes(id: number) {
  let i = imanes[id];
  if (typeof imanes[id] !== 'undefined') {
    imanes[id].activo = false;
    imanes.push(new Iman(imanes.length, i.posicionN.x, i.posicionN.y, i.width / 2, i.height, ctx));
    imanes.push(new Iman(imanes.length, i.posicionS.x, i.posicionS.y, i.width / 2, i.height, ctx));
  }
}

function signoRandom(): number {
  if (Math.random() >= 0.5) return 1;
  else return -1;
}