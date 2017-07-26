const defaultValue = []

export default (state = defaultValue, action) => {
    switch (action.type) {
        case 'CARD_ADD_BOARD':
            return [...state, action.card]
        default:
            return state;
    }
}