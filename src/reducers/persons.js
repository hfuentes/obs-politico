const persons = (state = [], action) => {
    return { persons : [{
        id: '1',
        personName: 'Hector'
    }, {
        id: '2',
        personName: 'Geraldine'
    }, {
        id: '3',
        personName: 'Matilda'
    }, {
        id: '4',
        personName: 'Máximo'
    }]}
}

export default persons