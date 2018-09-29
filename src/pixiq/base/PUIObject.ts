import * as base from '../base';
import * as core from '../core';

export class PUIObject extends base.PObject {
    protected Engine: core.PEngine;
    protected Instance: PIXI.Container;
    public Parent: base.PUIObject;
    public Childs: Array<base.PUIObject>;
    public Position: base.PPoint;
    public Size: base.PSize;
    public Alpha: number;
    public Visible: boolean;
    public Enabled: boolean;
    constructor(engine: core.PEngine) {
        super();
        this.Engine = engine;
        this.Childs = new Array<base.PUIObject>();
        this.Position = new base.PPoint();
        this.Size = new base.PSize();
        this.Alpha = 1.0;
        this.Visible = true;
        this.Enabled = true;
    }
    public GetInstance(): PIXI.Container {
        return this.Instance;
    }
    public SetSize(width: number, height: number) {
        this.Instance.width = width;
        this.Instance.height = height;
        this.Size.Width = width;
        this.Size.Height = height;
    }
    public SetAlpha(alpha: number) {
        this.Instance.alpha = alpha;
        this.Alpha = alpha;
    }
    public SetPosition(x: number, y: number) {
        this.Instance.x = x;
        this.Instance.y = y;
        this.Position.X = x;
        this.Position.Y = y;
    }
    public AddChild(child: base.PUIObject) {
        this.Childs.push(child);
        this.Instance.addChild(child.GetInstance());
        child.Parent = this;
    }
    public RemoveChild(child: base.PUIObject) {
        this.GetInstance().removeChild(child.GetInstance());
        this.Childs.splice(this.Childs.findIndex((element) => {
            return child.ID === element.ID;
        }), 1);
    }
}
