const INITIAL_STATE = { // reducers always must return state
    persons: [] //empty array for initial state
}

const applyLoadPersons = (state, action) => ({
    ...state, //all state properties, no changes state .. (?)
    persons: action.persons //persons arrays lives in action object
})

function personReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PERSONS_LOAD': {
            return applyLoadPersons(state, action)
        }
        default:
            return state
    }
}

export default personReducer