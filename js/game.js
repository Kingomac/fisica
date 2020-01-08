var canvas;
var ctx;
var imanes;
var funcionando = false;
function start() {
    canvas = document.getElementById('game');
    canvas.scrollIntoView();
    canvas.style.border = "solid 2px black";
    ctx = canvas.getContext('2d');
    var width = 200;
    var height = 100;
    imanes = [new Iman(0, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, ctx)];
    canvas.onclick = function () {
        imanes.forEach(function (i) {
            i.dividir();
        });
    };
    if (!funcionando) {
        update();
        funcionando = true;
    }
}
function update() {
    ctx.clearRect(0, 0, 1000, 1000);
    imanes.forEach(function (i) {
        if (i.activo)
            i.dibujar();
    });
    requestAnimationFrame(update);
}
var Iman = /** @class */ (function () {
    function Iman(id, x, y, width, height, ctx) {
        this.activo = true;
        this.tiempo = 0;
        this.id = id;
        this.posicionN = new Vector2(x, y);
        this.posicionS = new Vector2(x + width / 2, y);
        this.velocidad = new Vector2(0.3, 0.1 * signoRandom());
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }
    Iman.prototype.dibujar = function () {
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
    };
    Iman.prototype.dividir = function () {
        var _this = this;
        if (imanes.length * 2 >= 8)
            start();
        if (!this.dividido) {
            this.dividido = true;
            setInterval(function () {
                if (_this.activo)
                    _this.tiempo++;
            }, 1000);
            setTimeout(function () {
                convertirDosImanes(_this.id);
            }, 3000);
        }
    };
    return Iman;
}());
function convertirDosImanes(id) {
    var i = imanes[id];
    if (typeof imanes[id] !== 'undefined') {
        imanes[id].activo = false;
        imanes.push(new Iman(imanes.length, i.posicionN.x, i.posicionN.y, i.width / 2, i.height, ctx));
        imanes.push(new Iman(imanes.length, i.posicionS.x, i.posicionS.y, i.width / 2, i.height, ctx));
    }
}
function signoRandom() {
    if (Math.random() >= 0.5)
        return 1;
    else
        return -1;
}
