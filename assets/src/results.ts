import { _decorator, Component, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label,
        tooltip: 'Current Score'
    })
    public scoreLabel: Label;

    @property({
        type: Label,
        tooltip: 'High Score'
    })
    public highScore: Label;

    @property({
        type: Label,
        tooltip: 'Play Again?'
    })
    public resultEnd: Label;

    maxScore: number = 0;
    currentScore: number;

    updateScore(score: number) {
        this.currentScore = score;
        this.scoreLabel.string = (''+this.currentScore);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResult();
        this.scoreLabel.string = (''+this.currentScore);
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    toggleNodes(value) {
        this.highScore.node.active = value;
        this.resultEnd.node.active = value;
    }

    showResult() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScore.string = 'High Score is: ' + this.maxScore;
        this.toggleNodes(true);
    }

    hideResult() {
        this.toggleNodes(false);
    }
}