export default class Binding {

	#value;
	#binding;
	#elementBindings = [];
	#boundFunction;

    constructor ( scope, prop ) {

		this.#value = scope[ prop ];

    	Object.defineProperty( scope, prop, {

        	get: ( ) => {

				return this.valueGetter( );

			},

	        set: ( newValue ) => {

				this.valueSetter( newValue );

			}

    	} );

		scope[ prop ] = this.#value;

    }

	valueGetter ( ) {

		return this.#value

	}

	valueSetter ( value, callback = null ) {

		/**
		 * TODO: There is an issue when the value is a boolean from a select tag
		 * This turns it to a string 
		 * Maybe set something in this.#elementBindings for type where type: bool
		 * Then when being changed here can validate
		 * https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
		 */

        this.#value = value;

		this.#elementBindings.forEach( ( v, k ) => {

			this.#binding = this.#elementBindings[ k ];

			this.#binding.element[ this.#binding.attribute ] = value

		} );

		if ( callback ) {
		
			callback( );

		}

    }

	async bindTo ( elementQuerySelector, attribute, event = null ) {

		let element = document.querySelector( elementQuerySelector );

		if ( element === null ) {

			/**
			 * If the element is not found that means we are binding
			 * To a dynamically created element
			 * Lets wait for the element to appear then bind
			 */
			await new Promise ( resolve => {

				let targetNode = document.documentElement;
				let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

				let observerConfig = {
					childList: true,
					subtree: true
    			};

				let observer = new MutationObserver ( ( mutations ) => {

					mutations.forEach( ( mutation ) => {

						if( mutation.type == 'childList'){

							let element = document.querySelector( elementQuerySelector );

							if ( element !== null ) {

								this.bindElement( element, attribute, event );

								resolve( observer );

							}

						}

					} );

				} );

				observer.observe( targetNode, observerConfig );

			} ).then( ( observer ) => {

				observer.disconnect( );

			} );

		} else {

			this.bindElement( element, attribute, event = null );

		}

		return this;

	}

	bindFunction( ) {

		let callback_function = null;

		/**
		 * Need to remove and add back eventListener
		 * To Prevent recursion on events likes DOMSubtreeModified
		 */
		switch ( this.#binding.event ) {

			case 'DOMSubtreeModified':
			
				this.#binding.element.removeEventListener( this.#binding.event, this.#boundFunction, false );

				callback_function = ( ) => {
            
            		this.#binding.element.addEventListener( this.#binding.event, this.#boundFunction, false);
        
        		}

			break;

		}

		this.valueSetter( this.#binding.element[ this.#binding.attribute ], callback_function );

	}

	bindElement( element, attribute, event = null ) {

		this.#binding = {
			event: event,
			element: element,
            attribute: attribute
        }

        if ( this.#binding.event ) {

			this.#boundFunction = this.bindFunction.bind( this );
            this.#binding.element.addEventListener( this.#binding.event, this.#boundFunction, false);
        
		}

		this.#elementBindings.push( this.#binding );

        return this;

    }

}
