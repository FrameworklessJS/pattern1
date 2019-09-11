export default class User { 

	#authorized;

	constructor ( ) {

		console.log( "user.js" );
		
	}

	get authorized ( ) {

		return this.#authorized;

	}

	async getAuth ( ) {

		return new Promise ( async ( resolve, reject ) => {
			
			var xhr = new XMLHttpRequest( );

			xhr.onload = function( data ) {

				let response = JSON.parse( xhr.response );

				if ( response.auth.status === "fail" ) {

					reject( response.auth.message );

				} else {

					resolve( );

				}

			};

			xhr.onerror = function() { 

				reject( "Auth Request Failed" );

			};

			xhr.open( 'GET', `/test/data/login.php`, true );
			xhr.send( );

		} );

	}

}

const user = new User( );
