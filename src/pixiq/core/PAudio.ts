import * as base from '../base';
import * as core from '../core';

import * as PIXISound from 'pixi-sound';

export class PAudio extends base.PObject {
    private _Volume: number = 1.0;
    private _Loop: boolean = false;
    protected Instance: PIXISound.Sound;
    constructor() {
        super();
    }
    public Load(name: string) {
        var resource: any = PIXI.loader.resources[name];
        this.Instance = resource.sound;
    }
    public SetVolume(volume: number) {
        this.Instance.volume = volume;
        this._Volume = volume;
    }
    public SetLoop(loop: boolean) {
        this.Instance.loop = loop;
        this._Loop = loop;
    }
    public Play() {
        this.Instance.play();
    }
}
