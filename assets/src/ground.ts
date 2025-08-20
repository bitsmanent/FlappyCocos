import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
import { Ctrl } from './ctrl';

const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
	@property({
		type: Node,
		tooltip: 'Base 0'
	})
	public ground0: Node;

	@property({
		type: Node,
		tooltip: 'Base 1'
	})
	public ground1: Node;

	@property({
		type: Node,
		tooltip: 'Base 2'
	})
	public ground2: Node;

	public width0: number;
	public width1: number;
	public width2: number;

	public tmpStartLoc0 = new Vec3;
	public tmpStartLoc1 = new Vec3;
	public tmpStartLoc2 = new Vec3;

	public ctrl = new Ctrl();

	private i: number = 0;

	onLoad() {
		this.startUp();
	}

	startUp() {
		this.width0 = this.ground0.getComponent(UITransform).width;
		this.width1 = this.ground1.getComponent(UITransform).width;
		this.width2 = this.ground2.getComponent(UITransform).width;

		this.tmpStartLoc0.x = 0;
		this.tmpStartLoc1.x = this.width0;
		this.tmpStartLoc2.x = this.width1 + this.width2;

		this.refresh();
	}

	refresh() {
		this.ground0.setPosition(this.tmpStartLoc0);
		this.ground1.setPosition(this.tmpStartLoc1);
		this.ground2.setPosition(this.tmpStartLoc2);
	}

	update(deltaTime: number) {
		const x = this.ctrl.speed * deltaTime;

		this.tmpStartLoc0 = this.ground0.position;
		this.tmpStartLoc1 = this.ground1.position;
		this.tmpStartLoc2 = this.ground2.position;

		this.tmpStartLoc0.x -= x;
		this.tmpStartLoc1.x -= x;
		this.tmpStartLoc2.x -= x;

		/* keep rotating the ground to simulate movement */
		if(this.tmpStartLoc0.x <= 0 - this.width0)
			this.tmpStartLoc0.x = this.tmpStartLoc2.x + this.width2;
		else if(this.tmpStartLoc1.x <= 0 - this.width1)
			this.tmpStartLoc1.x =  this.tmpStartLoc0.x + this.width0;
		else if(this.tmpStartLoc2.x <= 0 - this.width2)
			this.tmpStartLoc2.x = this.tmpStartLoc1.x + this.width1;

		this.refresh();
	}
}
