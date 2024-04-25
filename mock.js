// Mock for the puzzle game

// Mocking the window.onload function
window.onload = jest.fn();

// Mocking the document.getElementById function
document.getElementById = jest.fn().mockReturnValue({
    append: jest.fn()
});

// Mocking the imgOrder array
const imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
jest.spyOn(imgOrder, 'shift').mockImplementation(() => imgOrder.shift());

// Mocking event listeners
const addEventListenerMock = jest.fn();
HTMLElement.prototype.addEventListener = addEventListenerMock;
// Importing the puzzle game functions
const { dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd } = require('./puzzle-game');

describe('Puzzle Game Tests', () => {
    // Test using Mock/return_value
    test('Test dragStart function', () => {
        const mockThis = { id: "0-0" };
        dragStart.call(mockThis);
        expect(mockThis).toEqual({ id: "0-0" });
    });

    // Test using Mock/side_effect
    test('Test dragDrop function', () => {
        const mockThis = { src: "image.jpg" };
        const mockOtherTile = { src: "3.jpg" };
        dragDrop.call(mockThis);
        expect(mockThis).toEqual({ src: "image.jpg" }); // No changes expected as otherTile.src does not include "3.jpg"
    });

    // Test using Patch
    test('Test dragEnd function', () => {
        // Mocking document.getElementById to return otherTile with src "3.jpg"
        document.getElementById.mockReturnValueOnce({
            src: "3.jpg"
        });

        const mockCurrTile = { id: "0-0", src: "image1.jpg" };
        const mockOtherTile = { id: "0-1", src: "3.jpg" };
        dragEnd.call(mockCurrTile);
        expect(mockCurrTile.src).toEqual("3.jpg"); // The src should be swapped with otherTile.src
    });
});
