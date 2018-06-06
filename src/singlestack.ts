/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>

//Singleton class
namespace O4D {
    export class SingleStack {
        private static instance: SingleStack;

        private constructor(public id: string){
            console.log(id);
        }

        static getInstance(){
            if (!SingleStack.instance){
                SingleStack.instance = new SingleStack('Created singleton');
            }
        }


    }


}