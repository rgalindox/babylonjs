/// <reference path=".././js/babylon.3.0.d.ts"/>

namespace O4D {
    export class InputController
    {

        constructor() {
        }

        AddInputListener(): void 
        {
           window.addEventListener('keydown', (event) => {                              
                this.InputController(event);
            } ,false)
        }

        InputController(evt: KeyboardEvent) {

        }



    }
}