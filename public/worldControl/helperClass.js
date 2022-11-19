export class ObjectPosition{
  constructor(){
    this.position = {x:0,y:0,z:20};
    this.sizeFactor = 1;
    this.speed = {x:0,y:0,z:0};
    this.rotation = {x:0,y:0,z:0}
    this.faceDirection = 0; //0 = up, 1 = right, 2 = down, 3 = left
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}