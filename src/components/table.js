import Binding from "../libraries/binding.js";

export default class Table {

	#html = '';
	#headerRows = '';
	#bodyRows = '';

	headers = { };
	bindValues = false;

	constructor ( options ) {

		console.log( "compontents/table.js" );
	
		if ( options.bindValues !== undefined ) {
		
			this.bindValues = options.bindValues;
		
		}

	}

	setHeader ( headers ) {

		this.headers = headers;

		this.#headerRows = `
			${this.#headerRows}
			<tr>
		`;

		const entries = Object.entries( headers );
		
		for ( const [ key, value ] of entries ) {

			if ( value.display === undefined ) {
			
				this.#headerRows = `${this.#headerRows}<th>${key}</th>`;
			
			} else {

				this.#headerRows = `${this.#headerRows}<th>${value.display}</th>`;

			}

		}

		this.#headerRows = `
			${this.#headerRows}
			</tr>
		`;

	}

	setBody ( jsonData ) {

		const entries = Object.entries( jsonData );

		for ( const [ key, value ] of entries ) {

			this.#bodyRows = `
				${this.#bodyRows}
				<tr>
			`;

			let headers = Object.entries( this.headers );

			for ( const [ hkey, hvalue ] of headers ) {

				let rowValue = '';
				let binding = false;

				if ( hvalue.fields !== undefined ) {
				
					hvalue.fields.forEach( ( v, i ) => {

						if ( i > 0 ) {

							rowValue = `${rowValue} `;

						}
						
						rowValue = `${rowValue}${v.split('.').reduce( ( o, i ) => o[i], value )}`

					} );
				
				} else {

					rowValue = value[hkey];
				
					binding = new Binding( jsonData[ key ], hkey );

				}

				this.#bodyRows = `
					${this.#bodyRows}
					<td id="${hkey}${key}">${rowValue}</td>
				`;

				if ( binding !== false ) {
				
					binding.bindTo( `#${hkey}${key}`, "innerHTML", "DOMSubtreeModified" );

				}

			}

			this.#bodyRows = `
				${this.#bodyRows}
				</tr>
			`;

		}

	}

	render ( ) {

		this.#html = `
			<table>
				<thead>
					${this.#headerRows}
				</thead>
				<tbody>
					${this.#bodyRows}
				</tbody>
			</table>
		`;

		return this.#html;

	}
}
