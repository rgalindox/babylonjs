
/// <reference path="./tadcontroller.ts"/>
/// <reference path=".././js/babylon.3.0.d.ts"/>

namespace O4D {
    export class LoadOrthoModel
    {        
        constructor(){}
        
        LoadObject(scene): void {
            BABYLON.SceneLoader.ImportMesh("", "./assets/", "main.babylon", scene, (meshes) => {                
                let cil = meshes[0];                        
                
                let materialObject = new BABYLON.StandardMaterial("textura",scene);
                
                let x = scene.getMeshByName("newGumX");
                x.material = materialObject;
                materialObject.diffuseTexture = new BABYLON.Texture("./assets/gums_ove.jpg",scene);                
                //materialObject.diffuseColor = new BABYLON.Color3(1.000, 0.714, 0.75);
                materialObject.specularPower = 32;
                
                let matAligner = new BABYLON.StandardMaterial("alignerMaterial", scene);
                matAligner.diffuseColor = new BABYLON.Color3(0.000, 0.749, 1.000);
                matAligner.alpha = 0.7;

                let braceMaterial = new BABYLON.StandardMaterial("braceMaterial", scene);
                braceMaterial.diffuseColor = new BABYLON.Color3(1.000, 0.843, 0.000);
                let bracketBase = scene.getMeshByName("bracket");
                bracketBase.material = braceMaterial;


                let buttonMaterial = new BABYLON.StandardMaterial("buttonMaterial", scene);
                buttonMaterial.diffuseColor = new BABYLON.Color3(0.000, 0.980, 0.604);
                let buttonBase = scene.getMeshByName("button");
                buttonBase.material = buttonMaterial;

                let attMaterial = new BABYLON.StandardMaterial("attMaterial", scene);
                attMaterial.diffuseColor = new BABYLON.Color3(1.000, 0.000, 1.000);
                let attBase = scene.getMeshByName("attachment");
                attBase.material = attMaterial;                

                meshes.forEach(element => {                          
                    if (element.name.substr(0,7) == "aligner"){
                        element.material = matAligner;  
                    }            
                });

                let tadBase = scene.getMeshByName("TAD_01");
                let tadClone = scene.getMeshByName("TAD_01 (1)");

                tadClone.setAbsolutePosition( new BABYLON.Vector3(tadBase.absolutePosition.x,tadClone.absolutePosition.y,tadBase.absolutePosition.z + 0.003));  
                tadClone.rotation = new BABYLON.Vector3(0,15,0);

                let myTad = new O4D.TadController();
                myTad.tadProperties = {name: "Tad", fdi: "45", tag: "tad", parent: "", type: "tad"}
                myTad.AddClickListener(scene,"TAD_01");

                let myTad2 = new O4D.TadController();
                myTad2.tadProperties = {name: "Tad1", fdi: "25", tag: "tad", parent: "", type: "tad"}
                myTad2.AddClickListener(scene,"TAD_01 (1)");                

                this.HideAllElements(meshes);
                
                
            });     
            
            
        }


        HideAllElements(theMeshes): void {
            theMeshes.forEach(element => {                          
                if (element.name.substr(0,7) == "aligner"){                    
                    element.visibility = 0;
                }            
                
                if (element.name.substr(0,3) == "TAD"){                        
                    element.visibility = 0;
                }        

                if (element.name.substr(0,7) == "bracket"){                        
                    element.visibility = 0;
                }      
                
                if (element.name.substr(0,6) == "button"){                        
                    element.visibility = 0;
                }   

                if (element.name.substr(0,10) == "attachment"){                        
                    element.visibility = 0;
                }                   
            });
        }


        ApplyTextures(theScene, theMeshArray): void {
            
            let matAligner = new BABYLON.StandardMaterial("alignerMaterial", theScene);
            matAligner.diffuseColor = new BABYLON.Color3(0.000, 0.749, 1.000);

            theMeshArray.forEach(element => {
                element.material = matAligner;    
            });

            
        }




    }
}

 