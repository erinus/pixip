import * as base from '../base';
import * as core from '../core';
import * as view from '../view';

import { IMAGES } from '../base/Resources';

import * as PIXI from 'pixi.js';
import * as Hammer from 'hammerjs';
import * as platform from 'platform';

export enum Browser {
    Chrome,
    Firefox,
    Safari,
    Opera,
    IE
}

export enum OS {
    Windows,
    MacOSX,
    Linux,
    Android,
    iOS
}

export class PEngine extends base.PObject {
    private _Application: PIXI.Application;
    private _DesignSize: base.PSize = new base.PSize();
    private _DesignRatio: number;
    private _WindowSize: base.PSize = new base.PSize();
    private _WindowRatio: number;
    private _Container: HTMLElement;
    private _Loading: view.PImage;
    private _GameLayer: view.PLayer;
    private _CtrlLayer: view.PLayer;
    private _CtrlFPS: view.PText;
    private _CtrlDBG: HTMLElement;
    private _Gesture: HammerManager;
    private _AutoResize: boolean;
    private _FullScreen: boolean;
    private _ShowFPS: boolean;
    private _ShowDBG: boolean;
    public IsReady: boolean = false;
    public Childs: Array<base.PUIObject>;
    public OnReady: (engine: core.PEngine, resources: Array<PIXI.loaders.Resource>) => void;
    public OnError: (engine: core.PEngine, resource: PIXI.loaders.Resource) => void;
    constructor(selector: string, width: number, height: number) {
        super();
        this._Application = new PIXI.Application({
            width: width,
            height: height
        });
        this._DesignSize.Width = width;
        this._DesignSize.Height = height;
        this._DesignRatio = this._DesignSize.Width / this._DesignSize.Height;
        this._WindowSize.Width = window.innerWidth;
        this._WindowSize.Height = window.innerHeight;
        this._WindowRatio = this._WindowSize.Width / this._WindowSize.Height;
        let html = document.querySelector('html');
        html.style.margin = '0';
        html.style.padding = '0';
        this._Container = document.querySelector(selector);
        this._Container.style.display = 'flex';
        this._Container.style.justifyContent = 'center';
        this._Container.style.alignItems = 'center';
        this._Container.style.backgroundColor = '#000000';
        this._Application = new PIXI.Application({
            width: this._DesignSize.Width,
            height: this._DesignSize.Height
        });
        this.Resize();
        this._Container.appendChild(this._Application.view);
        this._GameLayer = new view.PLayer(this);
        this._CtrlLayer = new view.PLayer(this);
        this._CtrlFPS = new view.PText(this);
        this._CtrlFPS.SetPosition(10, 5);
        this._CtrlFPS.SetFont('Play', 30);
        this._CtrlFPS.SetColor('#FFFFFF');
        this._CtrlFPS.SetAlpha(0.5);
        this._CtrlLayer.AddChild(this._CtrlFPS);
        this._Application.stage.addChild(this._GameLayer.GetInstance());
        this._Application.stage.addChild(this._CtrlLayer.GetInstance());
        this.Childs = new Array<base.PUIObject>();
        this.ShowLoading();
        this._Gesture = new Hammer.Manager(this._Container);
        this._AutoResize = false;
        this._FullScreen = false;
    }
    private Resize() {
        if (this._WindowRatio > this._DesignRatio) {
            this._Application.view.style.width = window.innerHeight * this._DesignRatio + 'px';
            this._Application.view.style.height = window.innerHeight + 'px';
        } else {
            this._Application.view.style.width = window.innerWidth + 'px';
            this._Application.view.style.height = window.innerWidth / this._DesignRatio + 'px';
        }
    }
    private ShowLoading() {
        this._Loading = new view.PImage(this);
        this._Loading.LoadFromDataURI(IMAGES.LOADING);
        this._Loading.SetSize(230, 69);
        this._Loading.SetPosition((this._DesignSize.Width - this._Loading.Size.Width) / 2, (this._DesignSize.Height - this._Loading.Size.Height) / 2);
        this._Loading.SetAlpha(0.75);
        this.AddChild(this._Loading);
        this._Application.renderer.render(this._Application.stage);
    }
    private HideLoading() {
        this.RemoveChild(this._Loading);
    }
    public IsOS(os: OS): boolean {
        let result = false;
        switch (os) {
            case OS.Windows:
                result = (platform.os.family === 'Windows');
                break;
            case OS.MacOSX:
                result = (platform.os.family === 'OS X');
                break;
            case OS.Linux:
                result = (platform.os.family === 'Linux');
                break;
            case OS.Android:
                result = (platform.os.family === 'Android');
                break;
            case OS.iOS:
                result = (platform.os.family.includes('iOS'));
                break;
        }
        return result;
    }
    public IsBrowser(browser: Browser): boolean {
        let result = true;
        switch (browser) {
            case Browser.Chrome:
                result = (platform.name === 'Chrome');
                break;
            case Browser.Firefox:
                result = (platform.name === 'Firefox');
                break;
            case Browser.Safari:
                result = (platform.name === 'Safari');
                break;
            case Browser.Opera:
                result = (platform.name === 'Opera');
                break;
            case Browser.IE:
                result = (platform.name === 'IE');
                break;
        }
        return result;
    }
    public IsCordova(): boolean {
        return !!window.cordova;
    }
    public IsMobile(): boolean {
        return this.IsOS(OS.iOS) || this.IsOS(OS.Android);
    }
    public IsDesktop(): boolean {
        return this.IsOS(OS.Linux) || this.IsOS(OS.MacOSX) || this.IsOS(OS.Windows);
    }
    public GetTexture(name: string): PIXI.Texture {
        return PIXI.loader.resources[name].texture;
    }
    public LoadImage(name: string, path: string) {
        PIXI.loader.add(name, path);
    }
    public LoadAudio(name: string, path: string) {
        PIXI.loader.add(name, path);
    }
    public NewPObject<T extends base.PObject>(PObjectExtendType: new () => T): T {
        let obj = new PObjectExtendType();
        return obj;
    }
    public NewPUIObject<T extends base.PUIObject>(PUIObjectExtendType: new (engine: PEngine) => T): T {
        let obj = new PUIObjectExtendType(this);
        return obj;
    }
    public NewPObjectWithArgs<T extends base.PObject>(PObjectExtendType: new (...args: Array<any>) => T, ...args: Array<any>): T {
        let obj = new PObjectExtendType(...args);
        return obj;
    }
    public NewPUIObjectWithArgs<T extends base.PUIObject>(PUIObjectExtendType: new (engine: PEngine, ...args: Array<any>) => T, ...args: Array<any>): T {
        let obj = new PUIObjectExtendType(this, ...args);
        return obj;
    }
    public AddChild(child: base.PUIObject) {
        this._GameLayer.GetInstance().addChild(child.GetInstance());
        child.Parent = this._GameLayer;
        this.Childs.push(child);
    }
    public RemoveChild(child: base.PUIObject) {
        this._GameLayer.GetInstance().removeChild(child.GetInstance());
        this.Childs.splice(this.Childs.findIndex((element) => {
            return child.ID === element.ID;
        }), 1);
    }
    public AutoResize() {
        this._AutoResize = true;
    }
    public FullScreen() {
        this._Gesture.add(new Hammer.Tap({
            taps: 2
        }));
        this._Gesture.on('tap', () => {
            if (document.documentElement.requestFullscreen) {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                    this._FullScreen = false;
                } else {
                    document.documentElement.requestFullscreen();
                    this._FullScreen = true;
                }
            }
            if (document.documentElement.webkitRequestFullscreen) {
                if (document.webkitFullscreenElement) {
                    document.webkitExitFullscreen();
                    this._FullScreen = false;
                } else {
                    document.documentElement.webkitRequestFullscreen();
                    this._FullScreen = true;
                }
            }
        });
    }
    public ShowFPS() {
        this._ShowFPS = true;
    }
    public ShowDBG() {
        if (!this.IsMobile()) {
            return;
        }
        let head = document.querySelector('head');
        let style = document.createElement('style');
        style.type = 'text/css';
        let css = document.createTextNode(`#debugger { width: 100%; height: 30px; bottom: 0; position: absolute; opacity: 0.75; font-size: 10px; font-family: 'Share Tech Mono'; word-break: break-all; background-color: #000000; overflow-y: hidden; } #debugger > div:nth-child(2) { overflow-y: scroll; } .debugger-line+.debugger-line { border-top: 1px solid #333333; } .debugger-line { padding: 6px; } .debugger-line+.debugger-line-log { border-top: 1px solid #333333; } .debugger-line-log { color: #BBBBBB; } .debugger-line+.debugger-line-info { border-top: 1px solid #666666; } .debugger-line-info { color: #FFFFFF; background-color: #444444; } .debugger-line+.debugger-line-warn { border-top: 1px solid #727239; } .debugger-line-warn { color: #FFFF88; background-color: #474720; } .debugger-line+.debugger-line-error { border-top: 1px solid #723D3D; } .debugger-line-error { color: #FFDDDD; background-color: #4D2727; } .debugger-line-head { font-weight: 900; } .debugger-line-body { margin-top: 4px; }`);
        style.appendChild(css);
        head.appendChild(style);
        this._CtrlDBG = document.createElement('div');
        this._CtrlDBG.id = 'debugger';
        this._CtrlDBG.style.fontFamily = 'Share Tech Mono';
        this._Container.appendChild(this._CtrlDBG);
        let dbgHeadElement = document.createElement('div');
        dbgHeadElement.style.height = '30px';
        dbgHeadElement.style.textAlign = 'center';
        this._CtrlDBG.appendChild(dbgHeadElement);
        let dbgHeadShowHideElement = document.createElement('div');
        dbgHeadShowHideElement.className = 'fa fa-bars';
        dbgHeadShowHideElement.style.display = 'block';
        dbgHeadShowHideElement.style.height = '30px';
        dbgHeadShowHideElement.style.fontSize = '14px';
        dbgHeadShowHideElement.style.lineHeight = '30px';
        dbgHeadShowHideElement.style.color = '#FFFFFF';
        dbgHeadShowHideElement.style.cursor = 'pointer';
        dbgHeadShowHideElement.addEventListener('click', () => {
            if (window.getComputedStyle(this._CtrlDBG, null).getPropertyValue('height') == '30px') {
                this._CtrlDBG.style.height = 'calc(50vh + 30px)';
            } else {
                this._CtrlDBG.style.height = '30px';
            }
        });
        dbgHeadElement.appendChild(dbgHeadShowHideElement);
        let dbgBodyElement = document.createElement('div');
        dbgBodyElement.style.height = '50vh';
        dbgBodyElement.style.backgroundColor = '#111111';
        this._CtrlDBG.appendChild(dbgBodyElement);
        (function(engine) {
            let log = console.log;
            console.log = function () {
                const args = Array.prototype.slice.apply(arguments);
                log.apply(console, args);
                if (engine._ShowDBG) {
                    let logDate = new Date();
                    let logNode = document.createElement('div');
                    logNode.className = 'debugger-line debugger-line-log';
                    let logHead = document.createElement('div');
                    logHead.className = 'debugger-line-head';
                    let logIcon = document.createElement('i');
                    logIcon.className = 'fa fa-clock-o';
                    logIcon.style.marginRight = '4px';
                    let logName = document.createTextNode(`${('00' + logDate.getHours()).substr(-2)}:${('00' + logDate.getMinutes()).substr(-2)}:${('00' + logDate.getSeconds()).substr(-2)}.${('00' + logDate.getMilliseconds()).substr(-3)}`);
                    let logBody = document.createElement('div');
                    logBody.className = 'debugger-line-body';
                    logBody.innerText = Array.prototype.join.apply(arguments, [' ']);
                    logHead.appendChild(logIcon);
                    logHead.appendChild(logName);
                    logNode.appendChild(logHead);
                    logNode.appendChild(logBody);
                    engine._CtrlDBG.children[1].appendChild(logNode);
                    engine._CtrlDBG.children[1].scrollTop = engine._CtrlDBG.children[1].scrollHeight;
                }
            };
            let info = console.info;
            console.info = function () {
                const args = Array.prototype.slice.apply(arguments);
                info.apply(console, args);
                if (engine._ShowDBG) {
                    let logDate = new Date();
                    let logNode = document.createElement('div');
                    logNode.className = 'debugger-line debugger-line-info';
                    let logHead = document.createElement('div');
                    logHead.className = 'debugger-line-head';
                    let logIcon = document.createElement('i');
                    logIcon.className = 'fa fa-clock-o';
                    logIcon.style.marginRight = '4px';
                    let logName = document.createTextNode(`${('00' + logDate.getHours()).substr(-2)}:${('00' + logDate.getMinutes()).substr(-2)}:${('00' + logDate.getSeconds()).substr(-2)}.${('00' + logDate.getMilliseconds()).substr(-3)}`);
                    let logBody = document.createElement('div');
                    logBody.className = 'debugger-line-body';
                    logBody.innerText = Array.prototype.join.apply(arguments, [' ']);
                    logHead.appendChild(logIcon);
                    logHead.appendChild(logName);
                    logNode.appendChild(logHead);
                    logNode.appendChild(logBody);
                    engine._CtrlDBG.children[1].appendChild(logNode);
                    engine._CtrlDBG.children[1].scrollTop = engine._CtrlDBG.children[1].scrollHeight;
                }
            };
            let warn = console.warn;
            console.warn = function () {
                const args = Array.prototype.slice.apply(arguments);
                warn.apply(console, args);
                if (engine._ShowDBG) {
                    let logDate = new Date();
                    let logNode = document.createElement('div');
                    logNode.className = 'debugger-line debugger-line-warn';
                    let logHead = document.createElement('div');
                    logHead.className = 'debugger-line-head';
                    let logIcon = document.createElement('i');
                    logIcon.className = 'fa fa-clock-o';
                    logIcon.style.marginRight = '4px';
                    let logName = document.createTextNode(`${('00' + logDate.getHours()).substr(-2)}:${('00' + logDate.getMinutes()).substr(-2)}:${('00' + logDate.getSeconds()).substr(-2)}.${('00' + logDate.getMilliseconds()).substr(-3)}`);
                    let logBody = document.createElement('div');
                    logBody.className = 'debugger-line-body';
                    logBody.innerText = Array.prototype.join.apply(arguments, [' ']);
                    logHead.appendChild(logIcon);
                    logHead.appendChild(logName);
                    logNode.appendChild(logHead);
                    logNode.appendChild(logBody);
                    engine._CtrlDBG.children[1].appendChild(logNode);
                    engine._CtrlDBG.children[1].scrollTop = engine._CtrlDBG.children[1].scrollHeight;
                }
            };
            let error = console.error;
            console.error = function () {
                const args = Array.prototype.slice.apply(arguments);
                error.apply(console, args);
                if (engine._ShowDBG) {
                    let logDate = new Date();
                    let logNode = document.createElement('div');
                    logNode.className = 'debugger-line debugger-line-error';
                    let logHead = document.createElement('div');
                    logHead.className = 'debugger-line-head';
                    let logIcon = document.createElement('i');
                    logIcon.className = 'fa fa-clock-o';
                    logIcon.style.marginRight = '4px';
                    let logName = document.createTextNode(`${('00' + logDate.getHours()).substr(-2)}:${('00' + logDate.getMinutes()).substr(-2)}:${('00' + logDate.getSeconds()).substr(-2)}.${('00' + logDate.getMilliseconds()).substr(-3)}`);
                    let logBody = document.createElement('div');
                    logBody.className = 'debugger-line-body';
                    logBody.innerText = Array.prototype.join.apply(arguments, [' ']);
                    logHead.appendChild(logIcon);
                    logHead.appendChild(logName);
                    logNode.appendChild(logHead);
                    logNode.appendChild(logBody);
                    engine._CtrlDBG.children[1].appendChild(logNode);
                    engine._CtrlDBG.children[1].scrollTop = engine._CtrlDBG.children[1].scrollHeight;
                }
            };
        } (this));
        this._CtrlDBG.style.display = 'none';
        this._Gesture.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_VERTICAL,
            pointers: 2
        }));
        this._Gesture.on('panup', () => {
            this._CtrlDBG.style.display = 'block';
        });
        this._Gesture.on('pandown', () => {
            this._CtrlDBG.style.display = 'none';
        });
        this._ShowDBG = true;
    }
    public Run() {
        window.addEventListener('resize', () => {
            this._WindowSize.Width = window.innerWidth;
            this._WindowSize.Height = window.innerHeight;
            this._WindowRatio = this._WindowSize.Width / this._WindowSize.Height;
            if (this._AutoResize) {
                this.Resize();
            }
        });
        this._Application.renderer.render(this._Application.stage);
        PIXI.loader.onComplete.add((loader: PIXI.loaders.Loader, resources: Array<PIXI.loaders.Resource>) => {
            this.IsReady = true;
            this.HideLoading();
            if (this.OnReady) {
                this.OnReady(this, resources);
            }
        });
        PIXI.loader.onProgress.add((loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
            
        });
        PIXI.loader.onError.add((error, loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
            if (this.OnError) {
                this.OnError(this, resource);
            }
        });
        PIXI.loader.load();
        this._Application.ticker.add((delta: number) => {
            if (!this.IsReady) {
                return;
            }
            if (this._ShowFPS) {
                this._CtrlFPS.SetText(`FPS: ${this._Application.ticker.FPS.toFixed(2)}`);
            }
        });
    }
}
