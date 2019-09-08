import Login from "/dist/components/login.js";
import Router from "/dist/libraries/router.js";
import User from "/dist/libraries/user.js";

const router = new Router( );
const user = new User( );

class App {

	constructor ( ) {

		console.log( "app.js" );

	}

	async init ( ) {

		try {

			await user.getAuth( );

			let Template = await import( "/dist/templates/white/template.js" );
			
			const template = new Template.default( );

			await template.init( );

			let Page = await import( `/dist/pages/${router.pageJS}` );

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
