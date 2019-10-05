export default class Binding {

	#value;
	#elementBindings = [];

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

	valueSetter ( value ) {

		/**
		 * TODO: There is an issue when the value is a boolean from a select tag
		 * This turns it to a string 
		 * Maybe set something in this.#elementBindings for type where type: bool
		 * Then when being changed here can validate
		 * https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
		 */

        this.#value = value;

		this.#elementBindings.forEach( ( v, k ) => {

			let binding = this.#elementBindings[ k ];

			binding.element[ binding.attribute ] = value

		} );

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

	bindElement( element, attribute, event = null ) {

		let binding = {
			element: element,
            attribute: attribute
        }

        if ( event ) {

			/*let once = true;
            binding.element.addEventListener( event, ( event ) => {

				/**
				 * This is a hack to get DOMSubtreeModified to fire only once
				 * Generally used for deteched innerHTML changes
				 */
				/*if ( once ) {

					once = false;

				} else {

					once = true;
					return;

				}

                this.valueSetter( binding.element[ attribute ] );

            } );*/

            binding.event = event
        }

		this.#elementBindings.push( binding );

        //binding.element[ attribute ] = this.#value;

        return this;

    }

}
