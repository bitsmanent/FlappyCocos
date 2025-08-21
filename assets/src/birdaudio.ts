import { _decorator, AudioClip, AudioSource, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
    @property({
        type: [AudioClip],
        tooltip: 'List of audio clips'
    })
    public clips: AudioClip[] = [];

    @property({
        type: AudioSource,
        tooltip: 'Audio node'
    })
    public source: AudioSource = null!;

    play(index: number) {
        const clip: AudioClip = this.clips[index];

        this.source.playOneShot(clip);
    }
}