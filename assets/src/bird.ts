import { _decorator, CCFloat, Component, Vec3, Animation, tween } from 'cc';
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

    @property({
        type: Ctrl,
        tooltip: 'Ctrl component'
    })
    public ctrl: Ctrl;

    public animation: Animation;
    public location: Vec3;

    onLoad() {
        this.reset();
        this.animation = this.getComponent(Animation);
    }

    reset() {
        this.location = new Vec3(0, 0, 0);
        this.node.setPosition(this.location);
    }

    fly() {
        const {x, y} = this.node.position;
        
        this.animation.stop();
        
        tween(this.node.position)
        .to(this.jumpDuration, new Vec3(x, y + this.jumpHeight, 0), {
            easing: "smooth",
            onUpdate: (target: Vec3, ratio: number) => {
                this.node.position = target;
            }
        }).start();

        this.animation.play();
    }

}


