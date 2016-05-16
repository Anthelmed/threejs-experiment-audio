import 'TweenMax';
import Scene from './scene/scene';
import Audio from './audio/audioManager';
import Dode from './components/dodecahedron';
import Octa from './components/octahedron';
import Plane from './components/plane';
import ParticlesEmmiter from './components/particlesEmmiter';

class App {

    /**
     * @constructor
     */
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();

        let dode = new Dode();
        let octa = new Octa();
        let planes = [];
        for (let i = 0; i < 100; i++) {
            let plane = new Plane();
            planes.push(plane);
        }
        let particlesEmmiter = new ParticlesEmmiter(planes);

        this.components = [dode, octa, particlesEmmiter];
        this.addObjects();

        this.audio = new Audio();
        this.initAudio();

        const root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.domElement);

        this.addListeners();
    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     */
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);
    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));
    }

    /**
     * @method
     * @name addListeners
     */
    addObjects() {
        this.scene.add(this.components[0].mesh);
        this.scene.add(this.components[1].mesh);
        for (let component of this.components[2].particles) {
            this.scene.add(component.mesh);
        }
    }

    /**
     * @method
     * @name addListeners
     */
    initAudio() {
        this.scene.add(this.audio.oceanAmbientSound);
        this.scene.cameraAdd(this.audio.audioListener);
    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     */
    update() {
        let currentPitches = this.audio.getCurrentPitches();
        let currentTimbre = this.audio.getCurrentTimbre();
        let currentLoudness = this.audio.getCurrentLoudness();

        this.components[0].update(currentPitches);
        this.components[1].update(currentTimbre);
        this.components[2].update(currentLoudness);

        this.scene.render();
    }

}

export default App
