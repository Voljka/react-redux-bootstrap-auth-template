import React from 'react';

import MainMenuItems from './MainMenuItems.react';
import Brand from './Brand.react';

class MainMenu extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<Brand />
					<MainMenuItems />
				</div>								
			</nav>			
		)
	}
}

export default MainMenu;
