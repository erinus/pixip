import * as base from '../base';
import * as core from '../core';
import * as view from '../view';

import * as PIXI from 'pixi.js';

export class PText extends base.PUIObject {
    protected Instance: PIXI.Text;
    private _FontFamily: string | string[] = ['Consolas', 'Ubuntu Mono', 'Monaco'];
    private _FontSize: string | number = 12;
    private _Color: string | number = '#000000';
    constructor(engine: core.PEngine) {
        super(engine);
        this.Instance = new PIXI.Text();
        this.Instance.style.fontFamily = this._FontFamily;
        this.Instance.style.fontSize = this._FontSize;
        this.Instance.style.fill = this._Color;
        // this.Instance.style.stroke = '#555';
        // this.Instance.style.strokeThickness = 4;
        // this.Instance.alpha = 0.75;
    }
    public SetText(text: string) {
        this.Instance.text = text;
    }
    public SetFont(family?: string | string[], size?: string | number) {
        if (family != null) {
            this._FontFamily = family;
            this.Instance.style.fontFamily = this._FontFamily;
        }
        if (family != null) {
            this._FontSize = size;
            this.Instance.style.fontSize = this._FontSize;
        }
    }
    public SetColor(color: string | number) {
        this._Color = color;
        this.Instance.style.fill = this._Color;
    }
}
