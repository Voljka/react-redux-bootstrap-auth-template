import React from 'react';

import MainMenu from './MainMenu.react';

class App extends React.Component {
	render() {
		return (
			<div className='row'>
				<MainMenu />
				{this.props.children}
			</div>
		)
	}
}

export default App;