import React from 'react';

import { cutString } from '../../../lib/common'

export default class TableCell extends React.Component {
	render(){
		
		var /*uncode = this.props.uncode,*/
			data = this.props.data,
			tdWidth = this.props.tdWidth,
			maxlength = this.props.maxlength,
			align = this.props.align;

		let content = data;

		if (maxlength) 
		 	content = cutString(data, maxlength);

		return (
			<td width={tdWidth} title={data} style={{ textAlign: align }} >
				{content}
			</td>
		)
	}
}