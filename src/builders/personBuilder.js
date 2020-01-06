const personBuilder = dbPerson => {
    const data = dbPerson.data()
    return {
        id: dbPerson.id,
        ...data //map all data attributes
    }
}

const personsBuilder = dbPersons => {
    let persons = []
    dbPersons.forEach(dbPerson => {
        persons.push(personBuilder(dbPerson))
    })
    return persons
}

export default personsBuilder

export { personBuilder }