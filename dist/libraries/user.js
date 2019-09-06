class User { 

	#authorized;

	constructor ( ) {

		console.log( "user.js" );
		
	}

	get authorized ( ) {

		//return false;
		return true;

	}

}

const user = new User( );
