import Login from "./components/login.js";
import Router from "./libraries/router.js";
import User from "./libraries/user.js";

const router = new Router( );
const user = new User( );

export const BASEDIR = import.meta.url.replace( `${window.location.protocol}//${window.location.host}`, "" ).replace( "app.js", "" );

class App {

	constructor ( ) {

		console.log( "app.js" );

	}

	async init ( ) {

		/**
		 * Still deciding to use an try catch at this level
		 * Problem is if there is a js error in one of the 
		 * Imported scripts the stacktrace is innacturate
		 */
		try {

			await user.getAuth( );

			let Template = await import( "./templates/white/template.js" );
			
			const template = new Template.default( );

			await template.init( );

			let Page = await import( `./pages/${router.pageJS}` );

			const page = new Page.default( );

			/**
			 * Technically we don't need an init( ) method
			 * We could just use the constructor BUT
			 * A constructor should be used to set up the class
			 * Not used to set up the HTML page like what our init( ) does
			 * So to keep things tidy we'll use an init( ) method
			 */
			if ( "init" in page) {
		
				console.log( page.init );

				page.init( );
			
			}

		} catch ( err ) {

			console.error( err );

		}

	}

	emptyNode ( node ) {

		while ( node.firstChild ) {

			node.removeChild( node.firstChild );

		}

	}

}

const app = new App( );
app.init( );
