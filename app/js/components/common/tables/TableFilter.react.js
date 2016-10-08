import React from 'react'

import { TEXT, SELECTOR_LIST, CHECKBOX, SELECTOR_LIST_MULTI, SELECTOR_LIST_MULTI_OPTIONAL } from '../../../constants/filters'

import { connect } from 'react-redux'
import { clientlistChangeFilter, clientlistDeleteFilter } from '../../../actions/GroupListActions'

import { dynamicSort } from '../../../lib/common';

function getSelectValues(select) {
	
	var result = [];
	var options = select && select.options;
	var opt;

	for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];

		if (opt.selected) {
			result.push(opt.value || opt.text);
		}
	}
	return result;
}

function selectAllItems(select) {
	
	var options = select && select.options;
	var opt;
	
	for (var i=1, iLen=options.length; i<iLen; i++) {
		opt = options[i];

		opt.selected = false;
	}
}

const TableFilter = ({field, uncode, changeFilter, deleteFilter}) => {

	let filter,
		filterMultiOptions,
		filterSelectedValue,
		selectedItems,
		filterOptions,
		size;

	switch (field.filtertype) {
		case TEXT: 
			size = parseInt(field.width) / 10;
			filter = <input 
				type="search" 
				size={size}
				maxLength='15' 
				ref={ (input) => {
					filterSelectedValue = input
				}}
				onChange = { () => {
					changeFilter({
						filteredColumn: field.id,
						filterType: TEXT,
						filterValue: filterSelectedValue.value
					})
				}}
			/>;
			break;
		
		case CHECKBOX: 
			filter = <input 
				type='checkbox' 
				ref={ (input) => {
					filterSelectedValue = input
				}}
				onChange = { () => {
					changeFilter({
						filteredColumn: field.id,
						filterType: CHECKBOX,
						filterValue: filterSelectedValue.checked ? 1 : 0
					})
				}}
			/>;
			break;
		
		case SELECTOR_LIST: 
			
			filterOptions = [];
			
			if (field.select instanceof Object) {

				for (var key in field.select) {
					filterOptions.push(
						<option key={key} value={key} >
							{field.select[key]}
						</option>
					)
				}

			} else {
				let options = uncode;
				
				options.sort(dynamicSort("name"));
				options.forEach( option => {
					filterOptions.push(
						<option key={option.id} value={option.id} >
							{option.name}
						</option>
					)
				})
			}
			
			filter = (
				<select
					// className="form-control"
					size="3"
					ref={ (input) => {
						filterSelectedValue = input
					}}
					onChange = { () => {
						changeFilter({
							filteredColumn: field.id,
							filterType: SELECTOR_LIST,
							filterValue:  filterSelectedValue.value
						})
					}}
				>
					{ filterOptions}
				</select>
			);
			break;

		case SELECTOR_LIST_MULTI: 
			
			filterMultiOptions = [];

			if (field.select instanceof Object) {

				for (var key in field.select) {
					filterMultiOptions.push(
						<option key={key} value={key} >
							{field.select[key]}
						</option>
					)
				}

			} else {
				let options = uncode;
				
				options.sort(dynamicSort("name"));
				options.forEach( option => {
					filterMultiOptions.push(
						<option key={option.id} value={option.id} >
							{option.name}
						</option>
					)
				})
			}

			filter = (
				<select
					multiple="true"
					size="3"
					// className="form-control"
					ref={ (input) => {
						filterSelectedValue = input
					}}
					onChange = { () => {
						changeFilter({
							filteredColumn: field.id,
							filterType: SELECTOR_LIST_MULTI,
							filterValue: getSelectValues( filterSelectedValue )
						})
					}}
				>
					{ filterMultiOptions}
				</select>
			);
			break;

		case SELECTOR_LIST_MULTI_OPTIONAL: 
			
			filterMultiOptions = [];
			filterMultiOptions.push(<option key="0" value="0"> All</option>);

			if (field.select instanceof Object) {
	
				for (var key in field.select) {
					filterMultiOptions.push(
						<option key={key} value={key} >
							{field.select[key]}
						</option>
					)
				}

			} else {
				let options = uncode;
				
				options.sort(dynamicSort("name"));
				options.forEach( option => {
					filterMultiOptions.push(
						<option key={option.id} value={option.id} >
							{option.name}
						</option>
					)
				})
			}

			filter = (
				<select
					multiple="true"
					size="3"
					// className="form-control"
					ref={ (input) => {
						filterSelectedValue = input
					}}
					onChange = { () => {
						
						selectedItems = getSelectValues( filterSelectedValue );

						if (selectedItems.indexOf("0") > -1) {

							deleteFilter(field.id);
							selectAllItems(filterSelectedValue);
						} else {

							changeFilter({
								filteredColumn: field.id,
								filterType: SELECTOR_LIST_MULTI,
								filterValue: getSelectValues( filterSelectedValue )
							})
						}
					}}
				>
					
					{ filterMultiOptions}
				</select>
			);
			break;

		
		default:
			filter = '';
	}
	return filter
}

const mapDispatchToProps = (dispatch) => {

	return {
		
		changeFilter: (filter) => {
			dispatch(clientlistChangeFilter(filter))
		},
		deleteFilter: (field) => {
			dispatch(clientlistDeleteFilter(field))
		}
	}
}

export default connect(null, mapDispatchToProps)(TableFilter)