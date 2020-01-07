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
			this.setState({ loading: true })
		}

		this.props.firebase
			.persons()
			.where('active', '==', true)
			.get()
			.then(snapshot => {
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
				<h3>Promesas de campaña</h3>
				{loading && <div>Loading ...</div>}
				{persons.map(person => (
					<div key={person.uid}>
						<span><strong>Name: </strong> {person.name}</span><br />
						{person.promises && person.promises.length ? <div>
							<span><strong>Promesas:</strong></span>
							<ul>
								{(person.promises || []).map((promise, promiseKey) => (
									<li key={promiseKey}>{promise.title}</li>
								))}
							</ul>
						</div> : <div></div>}
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
