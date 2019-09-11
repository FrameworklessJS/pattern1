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

	setBody ( body ) {

		const entries = Object.entries( body );

		for ( const [ key, value ] of entries ) {

			this.#bodyRows = `
				${this.#bodyRows}
				<tr>
			`;

			let headers = Object.entries( this.headers );

			for ( const [ hkey, hvalue ] of headers ) {

				let rowValue = '';

				if ( hvalue.fields !== undefined ) {
				
					hvalue.fields.forEach( ( v, i ) => {

						if ( i > 0 ) {

							rowValue = `${rowValue} `;

						}
						
						rowValue = `${rowValue}${v.split('.').reduce( ( o, i ) => o[i], value )}`

					} );
				
				} else {
				
					rowValue = value[hkey];
				
				}

				this.#bodyRows = `
					${this.#bodyRows}
					<td>${rowValue}</td>
				`;

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
