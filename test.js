import { dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd } from './puzzle.js';

describe('dragStart', () => {
  it('sets currTile to the dragged tile', () => {
    const tile = document.createElement('img');
    tile.id = '0-0';
    tile.src = '1.jpg';
    dragStart.call(tile);
    expect(currTile).toBe(tile);
  });
});

describe('dragOver', () => {
  it('prevents default event behavior', () => {
    const event = { preventDefault: jest.fn() };
    dragOver(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });
});

describe('dragEnter', () => {
  it('prevents default event behavior', () => {
    const event = { preventDefault: jest.fn() };
    dragEnter(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });
});

describe('dragLeave', () => {
  it('does nothing', () => {
    dragLeave();
    expect(true).toBe(true); // no-op
  });
});

describe('dragDrop', () => {
  it('sets otherTile to the dropped tile', () => {
    const tile = document.createElement('img');
    tile.id = '0-1';
    tile.src = '2.jpg';
    dragDrop.call(tile);
    expect(otherTile).toBe(tile);
  });
});

describe('dragEnd', () => {
  it('swaps tiles if they are adjacent', () => {
    const currTile = document.createElement('img');
    currTile.id = '0-0';
    currTile.src = '1.jpg';
    const otherTile = document.createElement('img');
    otherTile.id = '0-1';
    otherTile.src = '2.jpg';
    dragEnd();
    expect(currTile.src).toBe('2.jpg');
    expect(otherTile.src).toBe('1.jpg');
  });

  it('does not swap tiles if they are not adjacent', () => {
    const currTile = document.createElement('img');
    currTile.id = '0-0';
    currTile.src = '1.jpg';
    const otherTile = document.createElement('img');
    otherTile.id = '1-0';
    otherTile.src = '2.jpg';
    dragEnd();
    expect(currTile.src).toBe('1.jpg');
    expect(otherTile.src).toBe('2.jpg');
  });
});
