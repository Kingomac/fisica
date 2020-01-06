class Vector2{
  x:number
  y:number

  constructor(_x:number, _y:number){
    this.x = _x;
    this.y = _y;
  }
  getModulo?():number{
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  getUnitario?():Vector2{
    let modulo = this.getModulo();
    return new Vector2(this.x / modulo, this.y /modulo);
  }

  static Suma(...a:Vector2[]):Vector2{
    let resultado:Vector2 = new Vector2(0,0);
    a.forEach((n) => {
      resultado.x += n.x;
      resultado.y += n.y;
    })
    return resultado;
  }
  static MultiplicacionNumero(a:Vector2, ...b:number[]):Vector2{
    let resultado:Vector2 = a;
    b.forEach((n) => {
      resultado.x *= n;
      resultado.y *= n;
    })
    return resultado;
  }
  static MultiplicacionVectores(...a:Vector2[]){
    let resultado = new Vector2(1,1);
    a.forEach((v) => {
      resultado.x *= v.x;
      resultado.y *= v.y;
    })
    return resultado;
  }
  static Distancia(a: Vector2, b: Vector2):number{
    return this.Suma(a,this.MultiplicacionNumero(b,-1)).getModulo();
  }
  Aproximar?(a:Vector2, v:Vector2){
    let direccion = Vector2.Suma(this,Vector2.MultiplicacionNumero(a,-1)).getUnitario();
    this.x = direccion.x * v.x;
    this.y = direccion.y * v.y;
  }
  getPunto?():Punto{
    return {
      x: this.x,
      y: this.y
    }
  }
}
interface Punto {
 x: number,
 y: number
}
class Random{
 static From0To(a: number):number{
   return Math.floor(Math.random() * a);
 }
 static MenosXaX(x: number):number {
   let n = Math.floor(Math.random() * 2);
   let signo = 1;
   if(n == 0) signo = -1;
   return Math.floor(Math.random() * x) * signo;
 }
}