const dragEnd = require('./puzzle').dragEnd;

describe('dragEnd', () => {
  it('should swap the src of the current tile and the other tile if they are adjacent', () => {
    const currTile = { src: '1.jpg' };
    const otherTile = { src: '2.jpg' };
    const event = { target: otherTile };

    // Patch the dragEnd function to return a specific value
    jest.spyOn(dragEnd, 'mockReturnValueOnce').mockReturnValueOnce(true);

    // Call the dragEnd function with the current tile and the event
    dragEnd(currTile, event);

    // Expect the src of the current tile and the other tile to be swapped
    expect(currTile.src).toBe('2.jpg');
    expect(otherTile.src).toBe('1.jpg');
  });

  it('should not swap the src of the current tile and the other tile if they are not adjacent', () => {
    const currTile = { src: '1.jpg' };
    const otherTile = { src: '2.jpg' };
    const event = { target: otherTile };

    // Patch the dragEnd function to return a specific value
    jest.spyOn(dragEnd, 'mockReturnValueOnce').mockReturnValueOnce(false);

    // Call the dragEnd function with the current tile and the event
    dragEnd(currTile, event);

    // Expect the src of the current tile and the other tile to remain the same
    expect(currTile.src).toBe('1.jpg');
    expect(otherTile.src).toBe('2.jpg');
  });
});