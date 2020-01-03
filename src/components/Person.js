import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ onClick, personName }) => (
	<li
		onClick={onClick}
	>
		{personName}
	</li>
)

Person.propTypes = {
	onClick: PropTypes.func.isRequired,
	personName: PropTypes.string.isRequired
}

export default Person