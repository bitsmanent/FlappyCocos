import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, EventKeyboard, input, Input, KeyCode } from 'cc';
import { Ground } from './ground';
import { Results } from './results';
import { Bird } from './bird';
import { PipePool } from './pipepool';

const { ccclass, property } = _decorator;

@ccclass('Ctrl')
export class Ctrl extends Component {
    @property({
        type: Component,
        tooltip: 'Add groupnd prefab owner here'
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of ground'
    })
    public speed: number = 50;

    @property({
        type: CCInteger,
        tooltip: 'Change the speed of pipes'
    })
    public pipeSpeed: number = 200;

    @property({
        type: Results,
        tooltip: 'Add results here'
    })
    public result: Results;

    @property({
        type: Bird,
        tooltip: 'Bird component'
    })
    public bird: Bird;

    @property({
        type: PipePool,
        tooltip: 'Add canvas here'
    })
    public pipePool: PipePool;
    public running: boolean;

    onLoad() {
        this.initListener();
        this.resetGame();
        this.running = false;
        director.pause();
    }

    initListener() {
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this); /* Why TF the tutorial use this.node.on() (which doesn't works)? */

        const collider = this.bird.getComponent(Collider2D);

        collider.on(Contact2DType.BEGIN_CONTACT, this.onCollide, this);
    }

    startGame() {
        this.result.hideResult();
        director.resume();
        this.running = true;
    }

    onKeyDown(ev: EventKeyboard) {

        /* Note: used only for debugging purpose */
        switch(ev.keyCode) {
        case KeyCode.KEY_A: this.gameOver(); break;
        case KeyCode.KEY_P: this.result.addScore(); break;
        case KeyCode.KEY_Q:
            this.resetGame();
            this.bird.reset();
            break;
        }
    }

    onTouchStart() {
        if(this.running) {
            this.bird.fly();
            // this.clip.onAudioQueue(0);
            return;
        }

        this.resetGame();
        this.bird.reset();
        this.startGame();
        // this.bird.fly();
    }

    gameOver() {
        this.result.showResult();
        this.running = false;
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.pipePool.reset();
    }

    passPipe() {
        this.result.addScore();
    }

    createPipe() {
        this.pipePool.addPipe();
    }

    onCollide() {
        /* always assuming one collider is a bird */
        this.gameOver();
    }
}