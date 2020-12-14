const {
    createAdventure,
    addImageToAdventure,
    saveAdventure,
    unsaveAdventure,
    visitAdventure,
    unvisitAdventure,
    reviewAdventure,
    deleteReviewAdventure,
    deleteAdventure
} = require('../resolvers/adventure/adventureMutation.js')

test('Test', () => {
    expect(1).toBe(1)
})