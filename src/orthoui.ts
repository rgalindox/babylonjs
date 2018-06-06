/// <reference path="./elementproperties.ts"/>
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>

namespace O4D {
    export class OrthoUI
    {        
        private _gui: BABYLON.GUI.AdvancedDynamicTexture;
        private _theScene: BABYLON.Scene;
        private _buildBraces: boolean = false;
        private _buildButtons: boolean = false;
        private _buildAtt: boolean = false;

        public static activateSping: boolean = false;
        public static fps: string ="0";

        constructor(theScene: BABYLON.Scene){
            this._theScene = theScene;
        }
        
        InitUI(): void{
           this._gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        }

        BuildUI(): void{
            
            this.AddCheckboxes();                        
            this.AddButtons();
        }

        AddButtons(): void{
            var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Spin");
            button2.width = 0.1;
            button2.height = "40px";
            button2.color = "white";
            button2.background = "blue";
            button2.top = "42%";
            button2.left = "0%";
            button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this._gui.addControl(button2);    
            button2.onPointerDownObservable.add(() => {
                O4D.OrthoUI.activateSping = !O4D.OrthoUI.activateSping;
                console.log("ON " + O4D.OrthoUI.activateSping);
            });       
            
            var button3 = BABYLON.GUI.Button.CreateSimpleButton("but3", "Elastic on TADs");
            button3.width = 0.1;
            button3.height = "40px";
            button3.color = "white";
            button3.background = "blue";
            button3.top = "42%";
            button3.left = "12%";
            button3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this._gui.addControl(button3);    
            button3.onPointerDownObservable.add(() => {
                this.AddElastic();
            });            
            

        }

        AddElastic(): void{
            let t1 = this._theScene.getMeshByName("TAD_01");
            let t2 = this._theScene.getMeshByName('TAD_01 (1)');
            let puntos = [];    
    
            BABYLON.Mesh.CreateTube("tube", [t1.absolutePosition,t2.absolutePosition], 0.0003, 4, null, 0, this._theScene);          
            
            var line3d = this._theScene.getMeshByName("tube");
            var lineMat = new BABYLON.StandardMaterial("lineT",this._theScene);
            lineMat.diffuseColor = new BABYLON.Color3(0.486, 0.988, 0.000);
            line3d.material = lineMat;
        }

        AddCheckboxes(): void{                        
            var header = this.CreateText("textAligner","Aligners","180px","white","","-42%","0%");
            this._gui.addControl(header); 
            var header = this.CreateText("textBraces","Braces","180px","white","","-42%","5%");
            this._gui.addControl(header); 
            var header = this.CreateText("textButtons","Buttons","180px","white","","-42%","10%");
            this._gui.addControl(header); 
            var header = this.CreateText("textAtt","Attachments","180px","white","","-42%","15%");
            this._gui.addControl(header); 
            var header = this.CreateText("textTad","TADs","180px","white","","-42%","20%");
            this._gui.addControl(header);             

            var checkAlign = this.CreateCheckBox("checkAligner","20px","20px",false,"blue","left","0%");
            this._gui.addControl(checkAlign);  
            checkAlign.onIsCheckedChangedObservable.add((value) => {
                this.HideShowAligners();
            });

            var checkBraces = this.CreateCheckBox("checkBraces","20px","20px",false,"blue","left","5%");
            this._gui.addControl(checkBraces);  
            checkBraces.onIsCheckedChangedObservable.add((value) => {
                if (!this._buildBraces) {
                    this.AddAllBraces();
                    this._buildBraces = true;
                }
                this.HideShowBraces();
            });

            var checkButtons = this.CreateCheckBox("checkButtons","20px","20px",false,"blue","left","10%");
            this._gui.addControl(checkButtons);  
            checkButtons.onIsCheckedChangedObservable.add((value) => {
                if (!this._buildButtons) {
                    this.AddAllButtons();
                    this._buildButtons = true;
                }
                this.HideShowButtons();                
            });

            var checkAtt = this.CreateCheckBox("checkAtt","20px","20px",false,"blue","left","15%");
            this._gui.addControl(checkAtt);  
            checkAtt.onIsCheckedChangedObservable.add((value) => {
                if (!this._buildAtt) {
                    this.AddAllAttachments();
                    this._buildAtt = true;
                }
                this.HideShowAttachmentss();  
            });

            var checkTad = this.CreateCheckBox("checkTad","20px","20px",false,"blue","left","20%");
            this._gui.addControl(checkTad);  
            checkTad.onIsCheckedChangedObservable.add((value) => {
                this.HideShowTads();
            });



        }

        CreateCheckBox(theName, theWidth, theHeight, theIsChecked,theColor,theAlignment,theTop): BABYLON.GUI.Checkbox {
            let checkbox = new BABYLON.GUI.Checkbox();
            checkbox.name = theName;
            checkbox.width = theWidth;
            checkbox.height = theHeight;
            checkbox.isChecked = theIsChecked;
            checkbox.color = theColor;
            checkbox.top = theTop;
            switch (theAlignment){
                case ("left"):
                    checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    break;
                default:
                    checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    break;
            }  
            
            return checkbox;

        }

        CreateText(theName,theText, theWidth, theColor,theAlignment,theLeft,theTop): BABYLON.GUI.TextBlock {            
            let textControl = new BABYLON.GUI.TextBlock();
            textControl.name = theName;
            textControl.text = theText;
            textControl.width = theWidth;
            textControl.color = theColor;
            textControl.left = theLeft;
            textControl.top = theTop;
            switch (theAlignment){
                case ("left"):
                    textControl.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    break;
                default:
                    textControl.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    break;
            }                  

            return textControl;
        }

        AddAllBraces(): void{
            let baseBrace = this._theScene.getMeshByName("bracket");
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null){
                        let newBracket2Instance = baseBrace.clone("bracket" + i + j,bracketHolder);                        
                        newBracket2Instance.setAbsolutePosition(bracketHolder.absolutePosition);                     
                        newBracket2Instance.position.z -= 0.001;                        
                    }
                }
            }
        }

        AddAllButtons(): void{
            let baseButton = this._theScene.getMeshByName("button");
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null){
                        let newButtonInstance = baseButton.clone("button" + i + j,bracketHolder);                        
                        newButtonInstance.setAbsolutePosition(bracketHolder.absolutePosition);                     
                        newButtonInstance.position.z -= 0.001;
                        //newBracket2Instance.rotation = new BABYLON.Vector3(0,-90,0);
                    }
                }
            }
        }

        AddAllAttachments(): void{
            let baseAtt = this._theScene.getMeshByName("attachment");
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null){
                        let newAttInstance = baseAtt.clone("attachment" + i + j,bracketHolder);                        
                        newAttInstance.setAbsolutePosition(bracketHolder.absolutePosition);                     
                        newAttInstance.position.z -= 0.001;
                        //newBracket2Instance.rotation = new BABYLON.Vector3(0,-90,0);
                    }
                }
            }
        }
        
        

        HideShowBraces() {  
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let bracketOnOff = this._theScene.getMeshByName("bracket" + i + j);
                    if (bracketOnOff.visibility == 0){
                        bracketOnOff.visibility = 1;
                    } else {
                        bracketOnOff.visibility = 0;
                    }

                }
            }
        }

        HideShowButtons() {  
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let buttonOnOff = this._theScene.getMeshByName("button" + i + j);                    
                    if (buttonOnOff.visibility == 0){
                        buttonOnOff.visibility = 1;
                    } else {
                        buttonOnOff.visibility = 0;
                    }

                }
            }
        }
        
        HideShowAttachmentss() {  
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let attOnOff = this._theScene.getMeshByName("attachment" + i + j);
                    if (attOnOff.visibility == 0){
                        attOnOff.visibility = 1;
                    } else {
                        attOnOff.visibility = 0;
                    }

                }
            }
        }        

        HideShowAligners() {  
            for (let i = 1; i <= 4; i++) { 
                for (let j = 1; j <=8; j++){
                    let attOnOff = this._theScene.getMeshByName("aligner" + i + j);
                    if (attOnOff.visibility == 0){
                        attOnOff.visibility = 1;
                    } else {
                        attOnOff.visibility = 0;
                    }

                }
            }
        }        

        HideShowTads() {  
            this._theScene.meshes.forEach(element => {
                if (element.name.substr(0,3) == "TAD"){
                    if (element.visibility == 0){
                        element.visibility = 1;
                    } else {
                        element.visibility = 0;
                    }                    
                }
            });
        }              


    }
}