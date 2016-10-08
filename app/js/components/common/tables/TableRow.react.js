import React from 'react';

import TableCell from './TableCell.react';

import { arrayToObject } from '../../../lib/common'

export default class TableRow extends React.Component {

	render() {

		let tableCells  = [],
			data = this.props.data,
			uncode = this.props.uncode,
			fields = this.props.fields,
			content,
			coder;

		for (var key in fields) {
			
			content = data[fields[key].id];
			coder = uncode[fields[key].id];

			if (coder) {

				if (fields[key].select) {
					if (fields[key].select instanceof Object) {

						content = coder[ content ];
					} else {

						coder = arrayToObject(coder);
						content = coder[ content ];
					}
				} else {
					content = coder[ content ];
				}
			}

			if (! content)
				content = data[fields[key].id];

			tableCells.push( 
				<TableCell 
					key={ 'TC'+key} 
					tdWidth={fields[key].width} 
					maxlength={fields[key].maxlength} 
					align={fields[key].align} 
					data={content} 
				/>
			)
		}

		return (
			<tr>
				{ tableCells }
			</tr>
		)
	}
}
