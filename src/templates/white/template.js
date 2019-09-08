import Nav from "../../components/nav.js";
import { BASEDIR } from "../../app.js";

export default class TemplateWhite {

	#template = `
		<link rel="stylesheet" type="text/css" href="${BASEDIR}styles/reset.css" />
		<link rel="stylesheet" type="text/css" href="${BASEDIR}templates/white/styles.css" />
		
		<header></header>
		<content></content>
	`;

	constructor ( ) {
	
		console.log( "templates/white.js" );

		//super( );

		document.body.insertAdjacentHTML( "afterbegin", this.#template );

	}

	async init ( ) {

		return new Promise( async ( resolve ) => {
		
			let navigation = new Nav( );

			document.querySelector( "header" )
				.insertAdjacentHTML( 
					"afterbegin", 
					navigation.html
				);

			resolve( );

		} );

	}

}
