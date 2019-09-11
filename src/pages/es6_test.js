import XHR from "../libraries/xhr.js";
import Table from "../components/table.js";

export default class ES6TestClass {

	constructor ( ) {

		console.log( "ES6TestClass.js" );

	}

	init ( ) {

		document.querySelector( "content" )
			.insertAdjacentHTML( 
				"afterbegin", 
				"<h1>ES6 Test</h1>" 
			);
	
		this.buildTableHTML( );

	}

	async buildTableHTML ( ) {

		let xhr = new XHR(
			"GET",
			`/test/data/table.php`,
			true
		);

		let data = await xhr.call( );
		data = JSON.parse( data );

window.ES6TABLEDATA = data;

		let table = new Table( {
			bindValues: true
		} );

		table.setHeader( {
			"email" : { display: "Email" },
			"name" : {
				display: "Name",
				fields: [
					"name.first",
					"name.last"
				]
			}
		} );
		table.setBody( data );

		document.querySelector( "content" )
			.insertAdjacentHTML(
				"beforeend", 
				table.render( )
			);
	
	}

}

/**
 * Because the idea here is that javascript will create all elements
 * We can new this bad boy right now instead of waiting for either
 * Of the below options
 */
//const ES6Test = new ES6TestClass( );

//document.addEventListener( "DOMContentLoaded", ( ) => {

//window.addEventListener('load', ( ) => {
//	new ES6TestClass( );
//}, false );
