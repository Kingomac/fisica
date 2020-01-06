var Vector2 = /** @class */ (function () {
    function Vector2(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    Vector2.prototype.getModulo = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector2.prototype.getUnitario = function () {
        var modulo = this.getModulo();
        return new Vector2(this.x / modulo, this.y / modulo);
    };
    Vector2.Suma = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var resultado = new Vector2(0, 0);
        a.forEach(function (n) {
            resultado.x += n.x;
            resultado.y += n.y;
        });
        return resultado;
    };
    Vector2.MultiplicacionNumero = function (a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        var resultado = a;
        b.forEach(function (n) {
            resultado.x *= n;
            resultado.y *= n;
        });
        return resultado;
    };
    Vector2.MultiplicacionVectores = function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        var resultado = new Vector2(1, 1);
        a.forEach(function (v) {
            resultado.x *= v.x;
            resultado.y *= v.y;
        });
        return resultado;
    };
    Vector2.Distancia = function (a, b) {
        return this.Suma(a, this.MultiplicacionNumero(b, -1)).getModulo();
    };
    Vector2.prototype.Aproximar = function (a, v) {
        var direccion = Vector2.Suma(this, Vector2.MultiplicacionNumero(a, -1)).getUnitario();
        this.x = direccion.x * v.x;
        this.y = direccion.y * v.y;
    };
    Vector2.prototype.getPunto = function () {
        return {
            x: this.x,
            y: this.y
        };
    };
    return Vector2;
}());
var Random = /** @class */ (function () {
    function Random() {
    }
    Random.From0To = function (a) {
        return Math.floor(Math.random() * a);
    };
    Random.MenosXaX = function (x) {
        var n = Math.floor(Math.random() * 2);
        var signo = 1;
        if (n == 0)
            signo = -1;
        return Math.floor(Math.random() * x) * signo;
    };
    return Random;
}());
