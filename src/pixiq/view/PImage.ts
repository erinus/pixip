import * as PIXI from 'pixi.js';

import * as base from '../base';
import * as core from '../core';
import * as view from '../view';

export class PImage extends base.PUIObject {
    protected Instance: PIXI.Sprite;
    constructor(engine: core.PEngine) {
        super(engine);
    }                                                                           
    public LoadFromDataURI(datauri: string) {
        let image = new Image();
        image.src = datauri;
        let texture = new PIXI.Texture(new PIXI.BaseTexture(image));
        this.Instance = new PIXI.Sprite(texture);
    }
    public LoadFromTexture(texture: PIXI.Texture) {
        this.Instance = new PIXI.Sprite(texture);
    }
}
