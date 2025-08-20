import { _decorator, Component, Node, Vec3, UITransform, screen, find } from 'cc';
import { rand } from './utils';

const { ccclass, property } = _decorator;

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom pipe'
    })
    public bottomPipe: Node;

    public tmpStartLocUp: Vec3 = new Vec3(0, 0, 0);
    public tmpStartLocDown: Vec3 = new Vec3(0, 0, 0);

    public scene = screen.windowSize;
    public game: any;

    isPass: boolean;

    onLoad() {
        this.game = find('ctrl').getComponent('Ctrl');
        this.initPos();
        this.isPass = false;
    }

    initPos() {
        const w = this.scene.width;
        this.tmpStartLocUp.x = w + this.topPipe.getComponent(UITransform).width;
        this.tmpStartLocDown.x = w + this.bottomPipe.getComponent(UITransform).width;

        const gap = rand(90, 100) * 10; /* Why x10? */
        const topHeight = rand(0, 450);

        this.tmpStartLocUp.y = topHeight;
        this.tmpStartLocDown.y = topHeight - gap;

        this.refresh();
    }

    refresh() {
        this.topPipe.setPosition(this.tmpStartLocUp);
        this.bottomPipe.setPosition(this.tmpStartLocDown);
    }

    update(deltaTime: number) {
        const offset_x = this.game.pipeSpeed * deltaTime;

        this.tmpStartLocUp = this.topPipe.position;
        this.tmpStartLocDown = this.bottomPipe.position;
        this.tmpStartLocUp.x -= offset_x;
        this.tmpStartLocDown.x -= offset_x;

        if(!this.isPass && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if(this.topPipe.position.x < -this.scene.width) {
            this.game.createPipe();
            this.destroy();
        }
        this.refresh();
    }
}


