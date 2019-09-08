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

		try {

			await user.getAuth( );

			let Template = await import( "./templates/white/template.js" );
			
			const template = new Template.default( );

			await template.init( );

			let Page = await import( `./pages/${router.pageJS}` );

			const page = new Page.default( );

			page.init( );

		} catch ( err ) {

			console.error( `ERROR: ${err}` );

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
