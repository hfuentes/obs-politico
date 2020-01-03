import { connect } from 'react-redux'
import PersonList from './PersonList'

const mapStateToProps = (state) => {
	return state.persons
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPersonClick: (id) => {
			dispatch((id) => console.log('Click person id = ' + id))
		}
	}
}

const VisiblePersonList = connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonList)

export default VisiblePersonList