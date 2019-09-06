class ES6TestClass {

	constructor ( ) {

		console.log( "ES6TestClass" );

		let h1 = document.createElement( "h1" );
		h1[ "innerHTML" ] =  "ES6 Test";

		document.body.appendChild( h1 );

	}

}

/**
 * Because the idea here is that javascript will create all elements
 * We can new this bad boy right now instead of waiting for either
 * Of the below options
 */
const ES6Test = new ES6TestClass( );

//document.addEventListener( "DOMContentLoaded", ( ) => {

/*window.addEventListener('load', ( ) => {

	new ES6TestClass( );

}, false );*/
