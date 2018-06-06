/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>
/// <reference path="./sceneutils.ts"/>
/// <reference path="./inputcontroller.ts"/>
/// <reference path="./loadmodels.ts"/>
/// <reference path="./loadonemodel.ts"/>
/// <reference path="./orthoui.ts"/>
/// <reference path="./tadcontroller.ts"/>
/// <reference path="./elementproperties.ts"/>
/// <reference path="./singlestack.ts"/>
/// <reference path="./iproperties.ts"/>

class Game extends O4D.InputController{
        private _canvas: HTMLCanvasElement;
        private _engine: BABYLON.Engine;
        private _scene: BABYLON.Scene;
        private _camera: BABYLON.ArcRotateCamera;
        private _light: BABYLON.Light;
        private _event: Event;
        private _infoOn: boolean = false;
        private _spinOn: boolean = false;
        private _observer;
        private _rootObject;
        private _superGUI: O4D.OrthoUI;
        private _bkColor: BABYLON.Color4;

        constructor(canvasElement : string) {        
            // Create canvas and engine
            super();
            this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
            this._engine = new BABYLON.Engine(this._canvas, true);
            
        }

        createScene() : void {
            // create a basic BJS Scene object
            this._bkColor = new BABYLON.Color4(0.863, 0.078, 0.235, 1);
            this._scene = new BABYLON.Scene(this._engine);

                            
            this._camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, BABYLON.Vector3.Zero(), this._scene);                
            this._camera.setPosition(new BABYLON.Vector3(0.07359291881658388, -0.04753404168065539, -0.261010704453408));    
            

            // target the camera to scene origin            
            this._camera.setTarget(new BABYLON.Vector3(0,0,0));           

            // attach the camera to the canvas
            this._camera.attachControl(this._canvas, false);
            this._camera.fov = 0.434587;
            this._camera.minZ = 0.01;
            this._camera.maxZ = 1000;			

            // create a basic light, aiming 0,1,0 - meaning, to the sky
            this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,0,0), this._scene);
  
            let ux = new O4D.SceneUtils();
            //console.log("Data: " + ux.GetCurrentBKColor());

            BABYLON.DebugLayer.InspectorURL = './js/babylon.inspector.bundle.js';
            //this._scene.debugLayer.show();            

            this._observer = this._scene.onNewMeshAddedObservable.add(() => {
                //console.log("Observando when a mess is added");
            });
            
            let singleton = O4D.SingleStack.getInstance();
            let singleton2 = O4D.SingleStack.getInstance();

        }


        renderPipeline(): void{
            var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, this._scene, [this._camera]);
            defaultPipeline.bloomEnabled = false;
            defaultPipeline.fxaaEnabled = true;
            defaultPipeline.bloomWeight = 0.5;            
        }

        animate() : void {
            // run the render loop
            this._engine.runRenderLoop(() => {                
             if (O4D.OrthoUI.activateSping){
                 if (this._rootObject != null){
                    this._rootObject.rotation.y += 0.05;
                 } else {
                    this._rootObject = this._scene.getMeshByName("CenterPoint");
                 }
             }
                this._scene.render();
            });

            // the canvas/window resize event handler
            window.addEventListener('resize', () => {
                this._engine.resize();
            });

        
        }

        setBK(): void {
            this._scene.clearColor= this._bkColor;
            //;
        }


        InputListener(){
            this.AddInputListener();            
        }

        InputController(evt: KeyboardEvent) {
            if (evt.keyCode == 66){      
                console.log("Attempt to change background color")                              ;
                this._bkColor = new BABYLON.Color4(0.576, 0.439, 0.859, 1);
                this.setBK();
                
            }    

            if (evt.keyCode == 65)    {                
                //var postProcess = new BABYLON.FxaaPostProcess("fxaa", 2.0, this._camera);             
            }

            if (evt.keyCode == 68 )    {
                //console.log("Key D pressed...");
                this.ToggleScreenInfo();
            }

            if (evt.keyCode == 76 )    {
                //console.log("Key L pressed...");
                this.LoadOneObject();
            }

            if (evt.keyCode == 82 )    {     
                this._rootObject = this._scene.getMeshByName("CenterPoint");
                this._spinOn = !this._spinOn;
            }


        
            super.InputController(evt);
        }

 

        CreateO4DEvents(): void {
            this._event = new CustomEvent('update');
            window.addEventListener('update', (e) => {
                
            },false)
        }

        LoadObject(): void {
            let ky = new O4D.LoadOrthoModel();
            ky.LoadObject(this._scene);
            O4D.OrthoUI.activateSping = false;
            
        }

        LoadOneObject(): void {
            console.log("What????");
            let ky = new O4D.LoadOneModel();
            ky.LoadObject(this._scene);
            O4D.OrthoUI.activateSping = false;
            
        }

        ShowcameraPosition(): void{
            this._camera.setPosition(new BABYLON.Vector3(this._camera.position.x, this._camera.position.y, this._camera.position.z + 0.05));
        }

        SubscribeToEvent():void {
           // window.dispatchEvent(this._event);
        }

        ToggleScreenInfo(): void {
            if (this._infoOn) {
                this._scene.debugLayer.hide();
                this._infoOn = false;
            } else {
                this._scene.debugLayer.show();                
                this._infoOn = true;
            }
        }

        AddUI(): void{
            this._superGUI= new O4D.OrthoUI(this._scene);
            this._superGUI.InitUI();
            this._superGUI.BuildUI();
        }

        ListAllMeshesOnScene(): void{
            this._scene.meshes.forEach(element => {
                
            });
        }
}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'
    let game = new Game('renderCanvas');

    // Create the scene
    game.createScene();


    // start animation
    game.animate();

  
    game.setBK();
    
    game.InputListener();

    game.CreateO4DEvents();

    game.SubscribeToEvent();

    game.renderPipeline();

    game.AddUI();

    game.LoadObject();

    //game.ToggleScreenInfo();
});