var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path=".././js/babylon.3.0.d.ts"/>
var O4D;
(function (O4D) {
    var SceneUtils = (function () {
        function SceneUtils() {
        }
        SceneUtils.prototype.SetSceneBackground = function (backgroundColor, scene) {
            scene.clearColor = new BABYLON.Color3(1, 0, 0);
        };
        SceneUtils.prototype.GetCurrentBKColor = function () {
            return '#556789';
        };
        return SceneUtils;
    }());
    O4D.SceneUtils = SceneUtils;
})(O4D || (O4D = {}));
/// <reference path=".././js/babylon.3.0.d.ts"/>
var O4D;
(function (O4D) {
    var InputController = (function () {
        function InputController() {
        }
        InputController.prototype.AddInputListener = function () {
            var _this = this;
            window.addEventListener('keydown', function (event) {
                _this.InputController(event);
            }, false);
        };
        InputController.prototype.InputController = function (evt) {
        };
        return InputController;
    }());
    O4D.InputController = InputController;
})(O4D || (O4D = {}));
var O4D;
(function (O4D) {
    var ElementProperties = (function () {
        function ElementProperties() {
        }
        return ElementProperties;
    }());
    O4D.ElementProperties = ElementProperties;
})(O4D || (O4D = {}));
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path="./elementproperties.ts"/>
var O4D;
(function (O4D) {
    var TadController = (function () {
        function TadController() {
        }
        TadController.prototype.GetTadObject = function () {
        };
        TadController.prototype.SetTadProperties = function () {
        };
        TadController.prototype.AddClickListener = function (theScene, theTad) {
            var onPickAction = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (guy) {
                console.log("Clicking: " + guy.meshUnderPointer.name);
            });
            var t1 = theScene.getMeshByName(theTad);
            t1.actionManager = new BABYLON.ActionManager(theScene);
            t1.actionManager.registerAction(onPickAction);
            var tadMaterial = new BABYLON.StandardMaterial("tadMaterial", theScene);
            tadMaterial.diffuseColor = new BABYLON.Color3(0.184, 0.310, 0.310);
            t1.material = tadMaterial;
        };
        return TadController;
    }());
    O4D.TadController = TadController;
})(O4D || (O4D = {}));
/// <reference path="./tadcontroller.ts"/>
/// <reference path=".././js/babylon.3.0.d.ts"/>
var O4D;
(function (O4D) {
    var LoadOrthoModel = (function () {
        function LoadOrthoModel() {
        }
        LoadOrthoModel.prototype.LoadObject = function (scene) {
            var _this = this;
            BABYLON.SceneLoader.ImportMesh("", "./assets/", "main.babylon", scene, function (meshes) {
                var cil = meshes[0];
                var materialObject = new BABYLON.StandardMaterial("textura", scene);
                var x = scene.getMeshByName("newGumX");
                x.material = materialObject;
                materialObject.diffuseTexture = new BABYLON.Texture("./assets/gums_ove.jpg", scene);
                //materialObject.diffuseColor = new BABYLON.Color3(1.000, 0.714, 0.75);
                materialObject.specularPower = 32;
                var matAligner = new BABYLON.StandardMaterial("alignerMaterial", scene);
                matAligner.diffuseColor = new BABYLON.Color3(0.000, 0.749, 1.000);
                matAligner.alpha = 0.7;
                var braceMaterial = new BABYLON.StandardMaterial("braceMaterial", scene);
                braceMaterial.diffuseColor = new BABYLON.Color3(1.000, 0.843, 0.000);
                var bracketBase = scene.getMeshByName("bracket");
                bracketBase.material = braceMaterial;
                var buttonMaterial = new BABYLON.StandardMaterial("buttonMaterial", scene);
                buttonMaterial.diffuseColor = new BABYLON.Color3(0.000, 0.980, 0.604);
                var buttonBase = scene.getMeshByName("button");
                buttonBase.material = buttonMaterial;
                var attMaterial = new BABYLON.StandardMaterial("attMaterial", scene);
                attMaterial.diffuseColor = new BABYLON.Color3(1.000, 0.000, 1.000);
                var attBase = scene.getMeshByName("attachment");
                attBase.material = attMaterial;
                meshes.forEach(function (element) {
                    if (element.name.substr(0, 7) == "aligner") {
                        element.material = matAligner;
                    }
                });
                var tadBase = scene.getMeshByName("TAD_01");
                var tadClone = scene.getMeshByName("TAD_01 (1)");
                tadClone.setAbsolutePosition(new BABYLON.Vector3(tadBase.absolutePosition.x, tadClone.absolutePosition.y, tadBase.absolutePosition.z + 0.003));
                tadClone.rotation = new BABYLON.Vector3(0, 15, 0);
                var myTad = new O4D.TadController();
                myTad.tadProperties = { name: "Tad", fdi: "45", tag: "tad", parent: "", type: "tad" };
                myTad.AddClickListener(scene, "TAD_01");
                var myTad2 = new O4D.TadController();
                myTad2.tadProperties = { name: "Tad1", fdi: "25", tag: "tad", parent: "", type: "tad" };
                myTad2.AddClickListener(scene, "TAD_01 (1)");
                _this.HideAllElements(meshes);
            });
        };
        LoadOrthoModel.prototype.HideAllElements = function (theMeshes) {
            theMeshes.forEach(function (element) {
                if (element.name.substr(0, 7) == "aligner") {
                    element.visibility = 0;
                }
                if (element.name.substr(0, 3) == "TAD") {
                    element.visibility = 0;
                }
                if (element.name.substr(0, 7) == "bracket") {
                    element.visibility = 0;
                }
                if (element.name.substr(0, 6) == "button") {
                    element.visibility = 0;
                }
                if (element.name.substr(0, 10) == "attachment") {
                    element.visibility = 0;
                }
            });
        };
        LoadOrthoModel.prototype.ApplyTextures = function (theScene, theMeshArray) {
            var matAligner = new BABYLON.StandardMaterial("alignerMaterial", theScene);
            matAligner.diffuseColor = new BABYLON.Color3(0.000, 0.749, 1.000);
            theMeshArray.forEach(function (element) {
                element.material = matAligner;
            });
        };
        return LoadOrthoModel;
    }());
    O4D.LoadOrthoModel = LoadOrthoModel;
})(O4D || (O4D = {}));
/// <reference path="./elementproperties.ts"/>
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>
var O4D;
(function (O4D) {
    var OrthoUI = (function () {
        function OrthoUI(theScene) {
            this._buildBraces = false;
            this._buildButtons = false;
            this._buildAtt = false;
            this._theScene = theScene;
        }
        OrthoUI.prototype.InitUI = function () {
            this._gui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        };
        OrthoUI.prototype.BuildUI = function () {
            this.AddCheckboxes();
            this.AddButtons();
        };
        OrthoUI.prototype.AddButtons = function () {
            var _this = this;
            var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Spin");
            button2.width = 0.1;
            button2.height = "40px";
            button2.color = "white";
            button2.background = "blue";
            button2.top = "42%";
            button2.left = "0%";
            button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            this._gui.addControl(button2);
            button2.onPointerDownObservable.add(function () {
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
            button3.onPointerDownObservable.add(function () {
                _this.AddElastic();
            });
        };
        OrthoUI.prototype.AddElastic = function () {
            var t1 = this._theScene.getMeshByName("TAD_01");
            var t2 = this._theScene.getMeshByName('TAD_01 (1)');
            var puntos = [];
            BABYLON.Mesh.CreateTube("tube", [t1.absolutePosition, t2.absolutePosition], 0.0003, 4, null, 0, this._theScene);
            var line3d = this._theScene.getMeshByName("tube");
            var lineMat = new BABYLON.StandardMaterial("lineT", this._theScene);
            lineMat.diffuseColor = new BABYLON.Color3(0.486, 0.988, 0.000);
            line3d.material = lineMat;
        };
        OrthoUI.prototype.AddCheckboxes = function () {
            var _this = this;
            var header = this.CreateText("textAligner", "Aligners", "180px", "white", "", "-42%", "0%");
            this._gui.addControl(header);
            var header = this.CreateText("textBraces", "Braces", "180px", "white", "", "-42%", "5%");
            this._gui.addControl(header);
            var header = this.CreateText("textButtons", "Buttons", "180px", "white", "", "-42%", "10%");
            this._gui.addControl(header);
            var header = this.CreateText("textAtt", "Attachments", "180px", "white", "", "-42%", "15%");
            this._gui.addControl(header);
            var header = this.CreateText("textTad", "TADs", "180px", "white", "", "-42%", "20%");
            this._gui.addControl(header);
            var checkAlign = this.CreateCheckBox("checkAligner", "20px", "20px", false, "blue", "left", "0%");
            this._gui.addControl(checkAlign);
            checkAlign.onIsCheckedChangedObservable.add(function (value) {
                _this.HideShowAligners();
            });
            var checkBraces = this.CreateCheckBox("checkBraces", "20px", "20px", false, "blue", "left", "5%");
            this._gui.addControl(checkBraces);
            checkBraces.onIsCheckedChangedObservable.add(function (value) {
                if (!_this._buildBraces) {
                    _this.AddAllBraces();
                    _this._buildBraces = true;
                }
                _this.HideShowBraces();
            });
            var checkButtons = this.CreateCheckBox("checkButtons", "20px", "20px", false, "blue", "left", "10%");
            this._gui.addControl(checkButtons);
            checkButtons.onIsCheckedChangedObservable.add(function (value) {
                if (!_this._buildButtons) {
                    _this.AddAllButtons();
                    _this._buildButtons = true;
                }
                _this.HideShowButtons();
            });
            var checkAtt = this.CreateCheckBox("checkAtt", "20px", "20px", false, "blue", "left", "15%");
            this._gui.addControl(checkAtt);
            checkAtt.onIsCheckedChangedObservable.add(function (value) {
                if (!_this._buildAtt) {
                    _this.AddAllAttachments();
                    _this._buildAtt = true;
                }
                _this.HideShowAttachmentss();
            });
            var checkTad = this.CreateCheckBox("checkTad", "20px", "20px", false, "blue", "left", "20%");
            this._gui.addControl(checkTad);
            checkTad.onIsCheckedChangedObservable.add(function (value) {
                _this.HideShowTads();
            });
        };
        OrthoUI.prototype.CreateCheckBox = function (theName, theWidth, theHeight, theIsChecked, theColor, theAlignment, theTop) {
            var checkbox = new BABYLON.GUI.Checkbox();
            checkbox.name = theName;
            checkbox.width = theWidth;
            checkbox.height = theHeight;
            checkbox.isChecked = theIsChecked;
            checkbox.color = theColor;
            checkbox.top = theTop;
            switch (theAlignment) {
                case ("left"):
                    checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    break;
                default:
                    checkbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    break;
            }
            return checkbox;
        };
        OrthoUI.prototype.CreateText = function (theName, theText, theWidth, theColor, theAlignment, theLeft, theTop) {
            var textControl = new BABYLON.GUI.TextBlock();
            textControl.name = theName;
            textControl.text = theText;
            textControl.width = theWidth;
            textControl.color = theColor;
            textControl.left = theLeft;
            textControl.top = theTop;
            switch (theAlignment) {
                case ("left"):
                    textControl.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                    break;
                default:
                    textControl.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                    break;
            }
            return textControl;
        };
        OrthoUI.prototype.AddAllBraces = function () {
            var baseBrace = this._theScene.getMeshByName("bracket");
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null) {
                        var newBracket2Instance = baseBrace.clone("bracket" + i + j, bracketHolder);
                        newBracket2Instance.setAbsolutePosition(bracketHolder.absolutePosition);
                        newBracket2Instance.position.z -= 0.001;
                    }
                }
            }
        };
        OrthoUI.prototype.AddAllButtons = function () {
            var baseButton = this._theScene.getMeshByName("button");
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null) {
                        var newButtonInstance = baseButton.clone("button" + i + j, bracketHolder);
                        newButtonInstance.setAbsolutePosition(bracketHolder.absolutePosition);
                        newButtonInstance.position.z -= 0.001;
                        //newBracket2Instance.rotation = new BABYLON.Vector3(0,-90,0);
                    }
                }
            }
        };
        OrthoUI.prototype.AddAllAttachments = function () {
            var baseAtt = this._theScene.getMeshByName("attachment");
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var bracketHolder = this._theScene.getMeshByName("anchor" + i + j);
                    if (bracketHolder != null) {
                        var newAttInstance = baseAtt.clone("attachment" + i + j, bracketHolder);
                        newAttInstance.setAbsolutePosition(bracketHolder.absolutePosition);
                        newAttInstance.position.z -= 0.001;
                        //newBracket2Instance.rotation = new BABYLON.Vector3(0,-90,0);
                    }
                }
            }
        };
        OrthoUI.prototype.HideShowBraces = function () {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var bracketOnOff = this._theScene.getMeshByName("bracket" + i + j);
                    if (bracketOnOff.visibility == 0) {
                        bracketOnOff.visibility = 1;
                    }
                    else {
                        bracketOnOff.visibility = 0;
                    }
                }
            }
        };
        OrthoUI.prototype.HideShowButtons = function () {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var buttonOnOff = this._theScene.getMeshByName("button" + i + j);
                    if (buttonOnOff.visibility == 0) {
                        buttonOnOff.visibility = 1;
                    }
                    else {
                        buttonOnOff.visibility = 0;
                    }
                }
            }
        };
        OrthoUI.prototype.HideShowAttachmentss = function () {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var attOnOff = this._theScene.getMeshByName("attachment" + i + j);
                    if (attOnOff.visibility == 0) {
                        attOnOff.visibility = 1;
                    }
                    else {
                        attOnOff.visibility = 0;
                    }
                }
            }
        };
        OrthoUI.prototype.HideShowAligners = function () {
            for (var i = 1; i <= 4; i++) {
                for (var j = 1; j <= 8; j++) {
                    var attOnOff = this._theScene.getMeshByName("aligner" + i + j);
                    if (attOnOff.visibility == 0) {
                        attOnOff.visibility = 1;
                    }
                    else {
                        attOnOff.visibility = 0;
                    }
                }
            }
        };
        OrthoUI.prototype.HideShowTads = function () {
            this._theScene.meshes.forEach(function (element) {
                if (element.name.substr(0, 3) == "TAD") {
                    if (element.visibility == 0) {
                        element.visibility = 1;
                    }
                    else {
                        element.visibility = 0;
                    }
                }
            });
        };
        OrthoUI.activateSping = false;
        OrthoUI.fps = "0";
        return OrthoUI;
    }());
    O4D.OrthoUI = OrthoUI;
})(O4D || (O4D = {}));
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>
//Singleton class
var O4D;
(function (O4D) {
    var SingleStack = (function () {
        function SingleStack(id) {
            this.id = id;
            console.log(id);
        }
        SingleStack.getInstance = function () {
            if (!SingleStack.instance) {
                SingleStack.instance = new SingleStack('Created singleton');
            }
        };
        return SingleStack;
    }());
    O4D.SingleStack = SingleStack;
})(O4D || (O4D = {}));
/// <reference path=".././js/babylon.3.0.d.ts"/>
/// <reference path=".././js/babylon.gui.d.ts"/>
/// <reference path="./sceneutils.ts"/>
/// <reference path="./inputcontroller.ts"/>
/// <reference path="./loadmodels.ts"/>
/// <reference path="./orthoui.ts"/>
/// <reference path="./tadcontroller.ts"/>
/// <reference path="./elementproperties.ts"/>
/// <reference path="./singlestack.ts"/>
/// <reference path="./iproperties.ts"/>
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(canvasElement) {
        var _this = 
        // Create canvas and engine
        _super.call(this) || this;
        _this._infoOn = false;
        _this._spinOn = false;
        _this._canvas = document.getElementById(canvasElement);
        _this._engine = new BABYLON.Engine(_this._canvas, true);
        return _this;
    }
    Game.prototype.createScene = function () {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, BABYLON.Vector3.Zero(), this._scene);
        this._camera.setPosition(new BABYLON.Vector3(0.07359291881658388, -0.04753404168065539, -0.261010704453408));
        // target the camera to scene origin            
        this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
        // attach the camera to the canvas
        this._camera.attachControl(this._canvas, false);
        this._camera.fov = 0.434587;
        this._camera.minZ = 0.01;
        this._camera.maxZ = 1000;
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0, 0), this._scene);
        var ux = new O4D.SceneUtils();
        //console.log("Data: " + ux.GetCurrentBKColor());
        BABYLON.DebugLayer.InspectorURL = './js/babylon.inspector.bundle.js';
        //this._scene.debugLayer.show();            
        this._observer = this._scene.onNewMeshAddedObservable.add(function () {
            //console.log("Observando when a mess is added");
        });
        var singleton = O4D.SingleStack.getInstance();
        var singleton2 = O4D.SingleStack.getInstance();
    };
    Game.prototype.renderPipeline = function () {
        var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, this._scene, [this._camera]);
        defaultPipeline.bloomEnabled = false;
        defaultPipeline.fxaaEnabled = true;
        defaultPipeline.bloomWeight = 0.5;
    };
    Game.prototype.animate = function () {
        var _this = this;
        // run the render loop
        this._engine.runRenderLoop(function () {
            if (O4D.OrthoUI.activateSping) {
                if (_this._rootObject != null) {
                    _this._rootObject.rotation.y += 0.05;
                }
                else {
                    _this._rootObject = _this._scene.getMeshByName("CenterPoint");
                }
            }
            _this._scene.render();
        });
        // the canvas/window resize event handler
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };
    Game.prototype.setBK = function () {
        this._scene.clearColor = new BABYLON.Color4(0.941, 0.902, 0.549, 1);
    };
    Game.prototype.InputListener = function () {
        this.AddInputListener();
    };
    Game.prototype.InputController = function (evt) {
        if (evt.keyCode == 87) {
        }
        if (evt.keyCode == 65) {
            //var postProcess = new BABYLON.FxaaPostProcess("fxaa", 2.0, this._camera);             
        }
        if (evt.keyCode == 68) {
            //console.log("Key D pressed...");
            this.ToggleScreenInfo();
        }
        if (evt.keyCode == 76) {
            //console.log("Key L pressed...");
            this.LoadObject();
        }
        if (evt.keyCode == 82) {
            this._rootObject = this._scene.getMeshByName("CenterPoint");
            this._spinOn = !this._spinOn;
        }
        _super.prototype.InputController.call(this, evt);
    };
    Game.prototype.CreateO4DEvents = function () {
        this._event = new CustomEvent('update');
        window.addEventListener('update', function (e) {
        }, false);
    };
    Game.prototype.LoadObject = function () {
        var ky = new O4D.LoadOrthoModel();
        ky.LoadObject(this._scene);
        O4D.OrthoUI.activateSping = false;
    };
    Game.prototype.ShowcameraPosition = function () {
        this._camera.setPosition(new BABYLON.Vector3(this._camera.position.x, this._camera.position.y, this._camera.position.z + 0.05));
    };
    Game.prototype.SubscribeToEvent = function () {
        // window.dispatchEvent(this._event);
    };
    Game.prototype.ToggleScreenInfo = function () {
        if (this._infoOn) {
            this._scene.debugLayer.hide();
            this._infoOn = false;
        }
        else {
            this._scene.debugLayer.show();
            this._infoOn = true;
        }
    };
    Game.prototype.AddUI = function () {
        this._superGUI = new O4D.OrthoUI(this._scene);
        this._superGUI.InitUI();
        this._superGUI.BuildUI();
    };
    Game.prototype.ListAllMeshesOnScene = function () {
        this._scene.meshes.forEach(function (element) {
        });
    };
    return Game;
}(O4D.InputController));
window.addEventListener('DOMContentLoaded', function () {
    // Create the game using the 'renderCanvas'
    var game = new Game('renderCanvas');
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
    game.ToggleScreenInfo();
});
