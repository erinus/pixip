import * as base from '../base';
import * as core from '../core';

export class PFramework extends base.PObject {
    public IsReady: boolean = false;
    public OnReady: (framework: core.PFramework) => void;
    public OnError: (framework: core.PFramework) => void;
    constructor() {
        super();
    }
    public GetEngine(selector: string, width: number, height: number): core.PEngine {
        return new core.PEngine(selector, width, height);
    }
    public Run() {
        let clz = this;
        window.addEventListener('load', function() {
            clz.IsReady = true;
            if (clz.OnReady) {
                clz.OnReady(clz);
            }
            /*
            let nodes = [{
                name: 'link',
                link: 'https://fonts.googleapis.com/css?family=Play|Ubuntu+Mono|Share+Tech+Mono'
            }, {
                name: 'link',
                link: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
            }, {
                name: 'script',
                link: 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.0/pixi.min.js'
            }, {
                name: 'script',
                link: 'https://cdn.jsdelivr.net/npm/pixi-sound@2.0.1/dist/pixi-sound.min.js'
            }, {
                name: 'script',
                link: 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'
            }, {
                name: 'script',
                link: 'https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js'
            }];
            let promises: Array<Promise<HTMLElement>> = nodes.map((node) => {
                return new Promise((resolve, reject) => {
                    let element: HTMLElement = document.createElement(node.name);
                    element.onload = (e) => {
                        resolve();
                    };
                    element.onerror = (e) => {
                        reject({
                            link: node.link
                        });
                    };
                    switch (node.name) {
                        case 'link':
                            let linkElement: HTMLLinkElement = <HTMLLinkElement>element;
                            linkElement.rel = 'stylesheet';
                            linkElement.href = node.link;
                            document.head.appendChild(linkElement);
                            break;
                        case 'script':
                            let scriptElement: HTMLScriptElement = <HTMLScriptElement>element;
                            scriptElement.type = 'text/javascript';
                            scriptElement.src = node.link;
                            document.head.appendChild(scriptElement);
                            break;
                    }
                });
            });
            Promise.all(promises)
                .then((elements: Array<HTMLElement>) => {
                    clz.IsReady = true;
                    if (clz.OnReady) {
                        clz.OnReady(clz);
                    }
                })
                .catch((reason) => {
                    if (clz.OnError) {
                        clz.OnError(clz);
                    }
                });
            */
        });
    }
}
