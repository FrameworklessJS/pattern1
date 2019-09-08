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
			
			/**
			var xhr = new XMLHttpRequest( );

			xhr.onreadystatechange = ( data ) => {

				console.log( data );

			}

			xhr.open( 'GET', `server.php`, true );
			xhr.send( );
			*/

			//return false;
			//return true;

			//reject( 'PERMISSION DENIED!!!' );
			resolve( );

		} );

	}

}

const user = new User( );
