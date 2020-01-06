import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import { personsBuilder } from '../builders';

class PersonList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		if (!this.props.persons.length) {
			console.log('loading true ...')
			this.setState({ loading: true })
		}

		this.props.firebase.persons().get().then(snapshot => {
			this.props.onLoadPersons(personsBuilder(snapshot))
		}).catch(err => {
			console.error('Error getting <persons> documents', err)
		}).finally(() => this.setState({ loading: false }))
	}

	componentWillUnmount() {
		this.props.firebase.persons().off()
	}

	render() {
		const { persons } = this.props
		const { loading } = this.state

		return (
			<div>
				{loading && <div>Loading ...</div>}
				{persons.map(person => (
					<div key={person.uid}>
						<span><strong>Id: </strong> {person.id}</span><br />
						<span><strong>Name: </strong> {person.name}</span>
					</div>
				))}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	persons: Object.keys(state.personState.persons || []).map(key => ({
		...state.personState.persons[key],
		uid: key,
	})),
});

const mapDispatchToProps = dispatch => ({
	onLoadPersons: persons => dispatch({ type: 'PERSONS_LOAD', persons }),
});

export default compose(
	withFirebase,
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(PersonList);
