
export interface IGridVS<T> {
  items: T[];
  setItems(items: T[]): void;
  addItems(items: T[]): void;
  addItemsTop(items: T[]): void;
  removeAtIndex(index: number): void;
  Take(take: number): T[];
  getTotalCount(): number;
  setHeight(h: number): void;
  setWidth(w: number): void;
}


export class GridVS<T> implements IGridVS<T>  {

  items: T[];

  TileWidth = 100;
  TileHeight = 100;
  constructor(els = []) {
    this.items = els;
  }
  setItems(items: T[]) {
    this.items = items;
  }
  addItems(items: T[]) {
    this.items = this.items.concat(items);
  }
  addItemsTop(items: T[]) {
    this.items = items.concat(this.items);
  }
  removeAtIndex(index: number) {
    this.items = this.items.filter((item: any, idex: number) => index !== idex);
  }
  addItem(item: T) {
    this.items.push(item);
  }
  Take(take: number) {
    return (this.items || []).slice(0, take);
  }
  getTotalCount() {
    return this.items.length;
  }

  setHeight(h: number) {
    this.TileHeight = h;
  }
  setWidth(w: number) {
    this.TileWidth = w;
  }
  
}
