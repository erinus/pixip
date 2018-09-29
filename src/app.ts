import * as core from './pixiq/core';
import * as view from './pixiq/view';

let pixiqFramework = new core.PFramework();
pixiqFramework.OnReady = (framework: core.PFramework) => {
    let pixiqEngine = pixiqFramework.GetEngine('#container', 1080, 1920);
    pixiqEngine.AutoResize();
    pixiqEngine.FullScreen();
    pixiqEngine.ShowFPS();
    pixiqEngine.ShowDBG();
    pixiqEngine.LoadAudio('Audio.PokerFace', 'assets/audio/PokerFace.mp3');
    pixiqEngine.OnReady = (engine: core.PEngine, resources: Array<PIXI.loaders.Resource>) => {
        let log = '';
        log += `IsOS(Windows): ${pixiqEngine.IsOS(core.OS.Windows)}\n`;
        log += `IsOS(MacOSX): ${pixiqEngine.IsOS(core.OS.MacOSX)}\n`;
        log += `IsOS(Linux): ${pixiqEngine.IsOS(core.OS.Linux)}\n`;
        log += `IsOS(Android): ${pixiqEngine.IsOS(core.OS.Android)}\n`;
        log += `IsOS(iOS): ${pixiqEngine.IsOS(core.OS.iOS)}\n`;
        log += `IsBrowser(Chrome): ${pixiqEngine.IsBrowser(core.Browser.Chrome)}\n`;
        log += `IsBrowser(Firefox): ${pixiqEngine.IsBrowser(core.Browser.Firefox)}\n`;
        log += `IsBrowser(Safari): ${pixiqEngine.IsBrowser(core.Browser.Safari)}\n`;
        log += `IsBrowser(Opera): ${pixiqEngine.IsBrowser(core.Browser.Opera)}\n`;
        log += `IsBrowser(IE): ${pixiqEngine.IsBrowser(core.Browser.IE)}\n`;
        log += `IsCordova: ${pixiqEngine.IsCordova()}\n`;
        log += `IsMobile: ${pixiqEngine.IsMobile()}\n`;
        log += `IsDesktop: ${pixiqEngine.IsDesktop()}\n`;
        console.log(log);
        console.log(log);
        console.info('cdsdscscdcsdscdcvdvdvdvdsvdfvvdfvasdvbrteabqtebaenbteanteetaneanetnqeatneaneanneatnt');
        console.warn('cdsdscscdcsdscdcvdvdvdvdsvdfvvdfvasdvbrteabqtebaenbteanteetaneanetnqeatneaneanneatnt');
        console.error('cdsdscscdcsdscdcvdvdvdvdsvdfvvdfvasdvbrteabqtebaenbteanteetaneanetnqeatneaneanneatnt');
        console.log(log);
        console.log(log);
        let game = new core.PGame(pixiqEngine, 1080, 1920);
        game.LoadImage('Image.Table.1', 'assets/image/Table.1.png');
        game.OnReady = (game: core.PGame, resources: Array<PIXI.loaders.Resource>) => {
            console.log('game1 ready');
            let tableTexture = game.GetTexture('Image.Table.1');
            let tableImage = engine.NewPUIObject(view.PImage);
            tableImage.LoadFromTexture(tableTexture);
            tableImage.SetSize(1080, 1920);
            game.AddChild(tableImage);
            
            // let audioPokerFace = engine.NewPObject(core.PAudio);
            // audioPokerFace.Load('Audio.PokerFace');
            // audioPokerFace.SetVolume(0.1);
            // audioPokerFace.SetLoop(true);
            // audioPokerFace.Play();
        };
        game.OnError = (game: core.PGame, resource: PIXI.loaders.Resource) => {
            
        };
        game.Run();
    };
    pixiqEngine.OnError = (engine: core.PEngine, resource: PIXI.loaders.Resource) => {
        
    };
    pixiqEngine.Run();
};
pixiqFramework.OnError = function(framework: core.PFramework) {

};
pixiqFramework.Run();