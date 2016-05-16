import THREE from 'three';
import { randomInt,randomFloat } from '../utils/number-util';

class PlaneGeometry {
    constructor() {
        this.size = 3;
        this.segments = 1;
        let colors = [0xb1bfda, 0xb39674, 0xe4ebca];

        this.life = randomInt(200,500);
        this.position = {x: 0, y: 0, z: 0};
        this.velocity = {x: randomFloat(0.1,1), y: randomFloat(0.1,1), z: 0};
        this.color = colors[randomInt(0,colors.length)];

        const geometry = new THREE.PlaneGeometry( this.size, this.size, this.segments ),
            material = new THREE.MeshBasicMaterial({
                transparent: true,
                color: this.color
            });

        this.mesh = new THREE.Mesh( geometry, material );
    }

    update(value) {
        let speed = value * 500;

        if(this.life > 0) {
            this.life -= speed / 3;
            this.position.x += Math.sin(this.mesh.position.x + this.velocity.x) * speed;
            this.position.y += Math.cos(this.mesh.position.y + this.velocity.y) * speed;

            this.mesh.position.set(this.position.x, this.position.y, this.position.z);
            this.mesh.material.opacity = this.life / 300;
        } else {
            this.reset();
        }

    }

    reset() {
        this.life = randomInt(500,1000);
        this.position = {x: 0, y: 0, z: 0};
        this.velocity = {x: randomFloat(0.1,1), y: randomFloat(0.1,1), z: 0};
        this.mesh.material.opacity = 1;
    }
}

export default PlaneGeometry
