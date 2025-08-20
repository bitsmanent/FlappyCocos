import { _decorator, CCInteger, Component, director, EventKeyboard, input, Input, KeyCode } from 'cc';
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

    onLoad() {
        this.initListener();
        this.resetGame();
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this); /* Why TF the tutorial use this.node.on() (which doesn't works)? */
    }

    startGame() {
        this.result.hideResult();
        director.resume();
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
        this.bird.fly();
    }

    gameOver() {
        this.result.showResult();
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.pipePool.reset();
        this.startGame();
    }

    passPipe() {
        this.result.addScore();
    }

    createPipe() {
        this.pipePool.addPipe();
    }
}