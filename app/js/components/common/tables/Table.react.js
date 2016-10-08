import React from 'react'

import TableRow from './TableRow.react'
import TableFilter from './TableFilter.react'

const Table = ({filter, list, fields, uncode, tableId}) => {

	let data  = list;
	// let inputValues = {};

	let tableRows = [],
		tableHeader = [],
		tableFilters = [];

	let filteredColumns = 0;

	// Show Table Header
	fields.forEach( function(field) {
		
		if (field.filterable) {
			filteredColumns++;
		}

		tableHeader.push(
			<td key={field.id} width={field.width}> 
				{field.title}
			</td>
		);
	})

	// Show Table Filter Row
	if (filteredColumns > 0) {

		fields.forEach( function(field) {
			
			if (field.filterable) {
				tableFilters.push(
					<td key={field.id} > 
						<TableFilter 
							field={field} 
							uncode={uncode[field.id]}
						/>
					</td>
				)
			} else {
				tableFilters.push(
					<td key={field.id}> 
						{''}
					</td>
				);
			}
		})
	}
	
	// Show Table Body
	for (var key in data) {
		tableRows.push( 
			<TableRow fields={fields} key={'TR' + key} data={data[key]} uncode={uncode} />
		)
	}

	return (
		<table id={tableId} className='table table-striped table-bordered table-condensed'>
			<thead style={{ textAlign: 'center'}} >
				<tr>
					{tableHeader}
				</tr>	
				<tr>
					{tableFilters}
				</tr>
			</thead>
			<tbody>
				{ tableRows }
			</tbody>
		</table>
	)
}

export default Table;