import XHR from "../libraries/xhr.js"

export default class User { 

	#authorized;

	constructor ( ) {

		console.log( "user.js" );
		
	}

	get authorized ( ) {

		return this.#authorized;

	}

	getAuth ( ) {

		return new Promise ( async ( resolve, reject ) => {
	
			let response;
			let xhr = new XHR(
				'GET', 
				`/test/data/login.php`, 
				true
			)

			try {

				response = JSON.parse( await xhr.call( ) );

			} catch ( err ) {
			
				reject( new Error( err ) );

			}

			if ( response.auth.status === "fail" ) {

				reject( new Error( response.auth.message ) );

			} else {

				resolve( );

			}

		} );

	}

}

const user = new User( );
