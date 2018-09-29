import * as base from '../base';
import * as core from '../core';
import * as view from '../view';

import { IMAGES } from '../base/Resources';

import * as PIXI from 'pixi.js';

export class PGame extends base.PObject {
    private _Engine: core.PEngine;
    private _Loader: PIXI.loaders.Loader;
    private _Loading: view.PImage;
    private _DesignSize: base.PSize = new base.PSize();
    private _RootLayer: view.PLayer;
    private _GameLayer: view.PLayer;
    public IsReady: boolean = false;
    public Childs: Array<base.PUIObject>;
    public OnReady: (game: core.PGame, resources: Array<PIXI.loaders.Resource>) => void;
    public OnError: (game: core.PGame, resource: PIXI.loaders.Resource) => void;
    constructor(engine: core.PEngine, width: number, height: number) {
        super();
        this._Engine = engine;
        this._Loader = new PIXI.loaders.Loader();
        this._DesignSize.Width = width;
        this._DesignSize.Height = height;
        this._RootLayer = new view.PLayer(this._Engine);
        this._GameLayer = new view.PLayer(this._Engine);
        this._RootLayer.AddChild(this._GameLayer);
        this._Engine.AddChild(this._RootLayer);
        this.Childs = new Array<base.PUIObject>();
        this.ShowLoading();
    }
    private ShowLoading() {
        this._Loading = new view.PImage(this._Engine);
        this._Loading.LoadFromDataURI(IMAGES.LOADING);
        this._Loading.SetSize(230, 69);
        this._Loading.SetPosition((this._DesignSize.Width - this._Loading.Size.Width) / 2, (this._DesignSize.Height - this._Loading.Size.Height) / 2);
        this._RootLayer.AddChild(this._Loading);
    }
    private HideLoading() {
        this._RootLayer.RemoveChild(this._Loading);
    }
    public GetTexture(name: string): PIXI.Texture {
        return this._Loader.resources[name].texture;
    }
    public LoadImage(name: string, path: string) {
        this._Loader.add(name, path);
    }
    public LoadAudio(name: string, path: string) {
        this._Loader.add(name, path);
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
    public Run() {
        let clz = this;
        this._Loader.onComplete.add((loader: PIXI.loaders.Loader, resources: Array<PIXI.loaders.Resource>) => {
            this.IsReady = true;
            this.HideLoading();
            if (clz.OnReady) {
                clz.OnReady(clz, resources);
            }
        });
        this._Loader.onProgress.add((loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
            
        });
        this._Loader.onError.add((error, loader: PIXI.loaders.Loader, resource: PIXI.loaders.Resource) => {
            if (clz.OnError) {
                clz.OnError(clz, resource);
            }
        });
        this._Loader.load();
        PIXI.ticker.shared.add((delta: number) => {
            if (!this.IsReady) {
                return;
            }
        });
    }
}
