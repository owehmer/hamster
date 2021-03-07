export const GRID_LS_KEY = 'GRID_LS_KEY';
export type GridSquare = 'empty' | 'wall';

export type GridMapRow = GridSquare[];
export type GridMap = GridMapRow[];
export type Direction = 'left' | 'up' | 'right' | 'down';
