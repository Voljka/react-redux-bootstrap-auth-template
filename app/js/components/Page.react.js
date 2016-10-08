import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute }  from 'react-router';

/* Store*/
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
const store = configureStore();

import PageHeader from './PageHeader.react';
import App from './App.react';
import PageContent from './PageContent.react';

/* Content Elements*/

/* Non-working link */
import NotFound from './404.react';

class Page extends React.Component{

	render(){
		return (
			<div>		
				<PageHeader />

				<div className='row'>
					<Provider store ={ store }>

						<Router history={browserHistory}>
							<Route path='/' component={App}>

									<IndexRoute component={PageContent} />

							</Route>
							<Route path='*' component={NotFound} />
						</Router>

					</Provider>
				</div>
			</div>		
		)
	}
};

export default Page;

