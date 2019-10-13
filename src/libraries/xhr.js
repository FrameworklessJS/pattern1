export default class XHR {

	method;
	url;
	async;

	constructor ( method, url, async = false ) {
	
		console.log( "libraries/xhr.js" );
	
		this.method = method;
		this.url = url;
		this.async = async;

	}

	call ( ) {

		return new Promise ( ( resolve, reject ) => {
		
			var xhr = new XMLHttpRequest( );

			xhr.onload = ( ) => {

				resolve( xhr.response );

			}

			xhr.onerror = ( ) => {
			
				reject( new Error( xhr.response ) );
			
			}

			xhr.open( this.method, this.url, this.async );
			xhr.send( );
		
		} );

	}

}
