import React from 'react'
import PropTypes from 'prop-types'
import Person from './Person'

const PersonList = ({ persons, onPersonClick }) => (
	<div>
		<h3>Person list</h3>
		<ul>
			{
				persons.map(person => (
					<Person
						key={person.id}
						{...person} //send all object content
						onClick={() => onPersonClick(person.id)}
					/>
				))
			}
		</ul>
	</div>
)

PersonList.propTypes = {
	persons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		personName: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onPersonClick: PropTypes.func.isRequired
}

export default PersonList