import * as PIXI from 'pixi.js';

import * as base from '../base';
import * as core from '../core';
import * as view from '../view';

export class PLayer extends base.PUIObject {
    constructor(engine: core.PEngine) {
        super(engine);
        this.Instance = new PIXI.Container();
    }
}
