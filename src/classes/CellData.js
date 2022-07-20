class CellData {
  x;
  y;
  isFliped;
  isMine;
  neighbor;
  isFlaged;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isFliped = false;
    this.isMine = false;
    this.isFlaged = false;
    this.neighbor = 0;
  }
}
export default CellData;
