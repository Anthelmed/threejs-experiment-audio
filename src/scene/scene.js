import THREE from 'three';
import Wagner from '@superguigui/wagner';
import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import Noise from '@superguigui/wagner/src/passes/noise/noise';

class Scene {

    /**
     * @constructor
     */
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0x111111);

        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.5, 2500);
        this.camera.position.z = 1000;

        this.initPostProcessing();
    }

    /**
     * @method
     * @name initPostProcessing
     */
    initPostProcessing() {
        this.composer = new Wagner.Composer(this.renderer);

        this.bloomPass = new BloomPass({
            applyZoomBlur: true,
            zoomBlurStrength: 1,
            blurAmount: 0.8
        });

        this.noise = new Noise({
            amount: .01,
            speed: .2
        });
    }

    /**
     * @method
     * @name add
     * @description Add a child to the scene
     * @param {object} child - A THREE object
     */
    add(child) {
        this.scene.add(child);
    }

    /**
     * @method
     * @name remove
     * @description Remove a child from the scene
     * @param {object} child - A THREE object
     */
    remove(child) {
        this.scene.remove(child);
    }

    /**
     * @method
     * @name add
     * @description Add a child to the scene
     * @param {object} child - A THREE object
     */
    cameraAdd(child) {
        this.camera.add(child);
    }

    /**
     * @method
     * @name render
     * @description Renders/Draw the scene
     */
    render() {
        this.renderer.autoClearColor = true;
        this.composer.reset();
        this.composer.render(this.scene, this.camera);
        this.composer.pass(this.bloomPass);
        this.composer.toScreen();
    }

    /**
     * @method
     * @name resize
     * @description Resize the scene according to screen size
     * @param {number} newWidth
     * @param {number} newHeight
     */
    resize(newWidth, newHeight) {
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(newWidth, newHeight);
    }

}

export default Scene
