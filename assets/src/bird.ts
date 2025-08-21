import { _decorator, CCFloat, Component, Vec3, Animation, tween, find } from 'cc';
import { Ctrl } from './ctrl';

const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: 'How high does the bird fly?'
    })
    public jumpHeight: number = 1.5;

    @property({
        type: CCFloat,
        tooltip: 'How long does the bird fly?'
    })
    public jumpDuration: number = 1.5;

    public animation: Animation;
    public game: any;

    flyAnim = null;

    onLoad() {
        this.reset();
        this.animation = this.getComponent(Animation);
        this.game = find('ctrl').getComponent('Ctrl');
    }

    reset() {
        if(this.flyAnim)
            this.flyAnim.stop();
        this.node.setPosition(0, 0);
    }

    fly() {
        const {x, y} = this.node.position;

        this.animation.stop();
        if(this.flyAnim)
            this.flyAnim.stop();
        this.flyAnim = tween(this.node.position)
            .to(this.jumpDuration, new Vec3(x, y + this.jumpHeight, 0), {
                easing: "smooth",
                onUpdate: (target: Vec3, _ratio: number) => {
                    this.node.position = target;
                },
                onComplete: () => {
                    this.flyAnim = null;
                }
            }).start();

        this.animation.play();
    }

    update() {
        console.log("update bird");
    }
}