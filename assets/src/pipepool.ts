import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
import { Pipes } from './pipes';

const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab,
        tooltip: 'The prefab of pipes'
    })
    public prefabPipes = null;

    @property({
        type: Node,
        tooltip: 'Target node of the pipes'
    })
    public pipesTarget;

    public pool = new NodePool;
    public newPipe: Node = null;

    getNewPipe() {
        return instantiate(this.prefabPipes);
    }

    initPool() {
        const size = 3;

        for(let i = 0; i < size; i++) {
            const pipe = this.getNewPipe();

            if(!i) {
                this.pipesTarget.addChild(pipe);
                break;
            }
            this.pool.put(pipe);
        }
    }

    addPipe() {
        const pipe = this.pool.size() ? this.pool.get() : this.getNewPipe();

        this.pipesTarget.addChild(pipe);
    }

    reset() {
        this.pipesTarget.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


