import PersonList from './PersonList'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from '../components/Firebase';

const mapStateToProps = state => ({
	persons: Object.keys(state.personState.persons || {}).map(key => ({
		...state.personState.persons[key],
		uid: key
	}))
})

const mapDispatchToProps = dispatch => ({
	onSetPersons: persons => dispatch({
		type: 'PERSONS_SET',
		persons
	})
})

export default compose(
	withFirebase, 
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(PersonList)