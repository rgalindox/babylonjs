
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path="./elementproperties.ts"/>

namespace O4D {
    export class TadController {        

        public tadProperties: IProperties;


        constructor() {
        }

        GetTadObject(): void {

        }

        SetTadProperties(): void {

        }

        AddClickListener(theScene: BABYLON.Scene, theTad: string): void {
            let onPickAction = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,(guy) => {
                console.log("Clicking: " + guy.meshUnderPointer.name);
            });

            let t1 = theScene.getMeshByName(theTad);
            t1.actionManager = new BABYLON.ActionManager(theScene);            
            t1.actionManager.registerAction(onPickAction);

            
            let tadMaterial = new BABYLON.StandardMaterial("tadMaterial", theScene);
            tadMaterial.diffuseColor = new BABYLON.Color3(0.184, 0.310, 0.310);

            t1.material = tadMaterial;
        }

    }
}