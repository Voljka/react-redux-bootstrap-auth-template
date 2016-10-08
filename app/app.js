var React = require('react');
var ReactDOM = require('react-dom');

// Choose correct i18n file
var YAML = require('yamljs');

// Rendering Page
import Page from './js/components/Page.react';

ReactDOM.render(
	React.createElement(Page, null),
	document.getElementById('workspace')
);