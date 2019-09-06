class App {

	#requiredObjects = new Array( );

	constructor ( ) {

		console.log( "app.js" );

		this.require_once( "/dist/components/login.js" );
		this.require_once( "/dist/libraries/router.js" );

		( async ( ) => {

			await this.require_once( "/dist/libraries/user.js" );

			if ( user.authorized ) {

				this.require_once( `/dist/pages/${router.pageJS}` );

			} else { 

				alert( "user not authorized" );

			}

		} ) ( );

	}

	/**
     * Sometime we're out of scope and const wont work
     * To solve this we add our "const" as a property under
     * The window object and mark it as writable = false
     * To keep it protected
	 *
	 * Possible args can be found here 
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
	 */
	define ( ...args ) {

		let property = args[ 0 ];
		let parameters = args[ 1 ];

		Object.defineProperty( window, property, parameters );

	}

	emptyNode ( node ) {

		while ( node.firstChild ) {

			node.removeChild( node.firstChild );

		}

	}

	get requiredObjects ( ) {

		return this.#requiredObjects;

	}

	// not using camelcase here because I'm mimicking PHP require_once
	require_once ( root_url_path, type = "js" ) {

		return new Promise( resolve => {

			/**
			 * Check if already been added by require_once
			 */
			if ( ! this.#requiredObjects.includes( root_url_path ) ) {

				let ele;

				switch ( type ) {

					case "js":

						ele = document.createElement( "script" );

						ele.type = "text/javascript";
						ele.src = root_url_path;

					break;

					case "css":

						ele = document.createElement( "link" );

						ele.rel = "stylesheet";
						ele.type = "text/css";
						ele.href = root_url_path;

					break;

				}

				document.head.appendChild( ele );

				let handler = ( ) => {

					resolve( this );

					ele.removeEventListener( "load", handler );

				}

				ele.addEventListener( "load", handler, false );

				/**
				 * Add to private this.#requiredObjects
				 * To try and prevent multiple requires
				 */
				this.#requiredObjects.push( root_url_path );

			} else {

				console.warn( `Trying to require ${root_url_path} multiple times.` );

				resolve( this );

			}

		} );

	}

}

const app = new App( );
