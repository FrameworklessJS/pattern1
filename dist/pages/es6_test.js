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

	buildTableHTML ( ) {

		let i = 1;
		let rows = ``;

		while ( i <= 100 ) {

			rows = `${rows}
				<tr>
					<td>Row ${i} Col 1</td>
                    <td>Row ${i} Col 2</td>
                    <td>Row ${i} Col 3</td>
				</tr>
			`;

			i++;

		}

		let table = `
			<table>
				<thead>
					<tr>
						<th>Col 1</th>
						<th>Col 2</th>
						<th>Col 3</th>
					</tr>
				</thead>
				<tbody>
					${rows}
				</tbody>
			</table>
		`;

        document.querySelector( "content" )
            .insertAdjacentHTML(
                "beforeend",
            	table
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
