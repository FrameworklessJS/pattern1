export default class Router { 

	#pathParts;
	#pageJS;

	constructor ( ) {

		console.log( "router.js" );
		
		this.#pathParts = window.location.pathname.split('/');

		let page = this.#pathParts.slice(-1)[0];

		if ( page.length <= 0 ) {
		
			page = 'index.';

		}

		console.log(page);

		this.#pageJS = `${page.substr( 0, page.lastIndexOf( '.' ) )}.js`;

	}

	get pageJS ( ) {

		return this.#pageJS;

	}

}

// const router = new Router( );
