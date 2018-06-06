/// <reference path=".././js/babylon.3.0.d.ts"/>

namespace O4D {
    export class SceneUtils
    {
        constructor(){}

        public SetSceneBackground(backgroundColor: string, scene): void
        {
            scene.clearColor = new BABYLON.Color3(1,0,0);    
        }

        public GetCurrentBKColor(): string
        {
            return '#556789';
        }
    }
}