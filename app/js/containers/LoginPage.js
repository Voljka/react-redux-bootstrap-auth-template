import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';

const  mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(UserActions, dispatch)
	}
}


export class LoginPage extends React.Component {
	
	handleSubmit(e) {
		e.preventDefault()
		this.props.actions.login({
			name: e.target.elements[0].value
		})
	}

	render() {

		return (
			<div className='row'>
				<div className="col-md-12">
					<form className='form-inline' onSubmit={this.handleSubmit}>
						<input className='form-control' type='text' placeholder='login' />{' '}
						<button className='btm btn-primary' type='submit'>Login</button>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


// export default class LoginPage extends React.Component {
// 	render() {

// 		return  (
// 			<h1>Login Pager</h1>
// 		)
// 	}
// }
