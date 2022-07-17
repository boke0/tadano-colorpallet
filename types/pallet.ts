export interface Pallet {
  id: string;
  name: string;
  cells: Cell[]
}

export interface Cell {
  id: string;
  name: string;
  color: string;
}
