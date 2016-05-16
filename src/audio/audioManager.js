import THREE from 'three';
import json from '../audio-analysis/defiant-order.json';
import { sum } from '../utils/number-util';

class Audio {
    constructor() {
        this.segments = json.segments;

        this.audioUrl = './audio/defiant-order.mp3';
        this.audioListener = new THREE.AudioListener();
        this.oceanAmbientSound = new THREE.Audio( this.audioListener );
        this.audioLoader = new THREE.AudioLoader();

        this.init();
    }

    init() {
        this.audioLoader.load(
            // resource URL
            this.audioUrl,
            // Function when resource is loaded
            ( audioBuffer ) => {
                this.oceanAmbientSound.setBuffer( audioBuffer );
                this.oceanAmbientSound.play();

            },
            // Function called when download progresses
            ( xhr ) => {
                console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
            // Function called when download errors
            ( xhr ) => {
                console.log( 'An error happened' );
            }
        );
    }

    getCurrentLoudness() {
        let currentTime = this.oceanAmbientSound.context.currentTime;
        let segments = this.segments;

        for (let i = 0; i < segments.length; i++) {
            if(currentTime >= segments[i].start && currentTime <= segments[i].start + segments[i].duration) {
                return segments[i].loudness_max_time;
            }
        }
    }

    getCurrentPitches() {
        let currentTime = this.oceanAmbientSound.context.currentTime;
        let segments = this.segments;

        for (let i = 0; i < segments.length; i++) {
            if(currentTime >= segments[i].start && currentTime <= segments[i].start + segments[i].duration) {
                return sum(segments[i].pitches) / 12;
            }
        }
    }

    getCurrentTimbre() {
        let currentTime = this.oceanAmbientSound.context.currentTime;
        let segments = this.segments;

        for (let i = 0; i < segments.length; i++) {
            if(currentTime >= segments[i].start && currentTime <= segments[i].start + segments[i].duration) {
                return sum(segments[i].timbre) / 12;
            }
        }
    }
}

export default Audio
