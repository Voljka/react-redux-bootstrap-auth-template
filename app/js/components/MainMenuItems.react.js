import React from 'react';

import { Link } from 'react-router';

import getCorrectI18nFile from '../lib/i18n/i18n';
var _i18n = getCorrectI18nFile();

// Get MenuItems
var menuItems = require('../../data/mainmenuSubs.json')['items'];

// Get UserRights
import getUserRights from '../rights/rights';
var userRights = getUserRights();

class MainMenuItems extends React.Component {
	render() {

		var _menuItems = [];

		for (var key in menuItems) {
			var currentItem = menuItems[key];
			
			_menuItems.push(makeCurrentItem(currentItem));
		}

		return (
			<div className='navbar-default'>

					<button className="navbar-toggle" data-toggle="collapse" data-target="#navbar-mainmenu">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<div id="navbar-mainmenu" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							{ _menuItems }
						</ul>	
					</div>	

			</div>	
		)
	}
}

const makeCurrentItem = (item, submenu) => {

	var result = [];
	var menuClass,
			menuDataToggle;

	var isItemAvailable = userRights.mainmenu[item.elementName];

	if ( isItemAvailable !== false) {

		//Checking for subItems in currentItem
		if (item.subitems && item.subitems.length > 0) {

			var subItems = [];
			for (var key in item.subitems) {
				subItems.push(makeCurrentItem(item.subitems[key], true))
			}	
			
			if (submenu) {
				//var _key = 'key'+(+newDate);
				result.push(
					<li key={+new Date} className="dropdown-submenu" data-submenu>
					   <Link to={item.href}> { _i18n.mainmenu[item.elementName] }  </Link>
					   <ul className="dropdown-menu">
					   	{ subItems }
					   </ul>	
					</li>
				);					
			} else {
				result.push(
					<li key={+new Date} className="dropdown">
					   <a href='#' className="dropdown-toggle"  data-submenu data-toggle="dropdown"> 
					   		{ _i18n.mainmenu[item.elementName] } 
					   		<b className="caret"></b>
					   </a>
					   <ul className="dropdown-menu">
					   	{ subItems }
					   </ul>	
					</li>
				);					
			}
		} else {
			result.push(
				<li key={+new Date}>
			   <Link to={item.href}> { _i18n.mainmenu[item.elementName] }  </Link>
				</li>
			)
		}
	}

	return result;
}

export default MainMenuItems;

