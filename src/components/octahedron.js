import THREE from 'three';

class OctahedronGeometry {
    constructor() {
        this.radius = 100;
        this.detail = 0;

        const geometry = new THREE.OctahedronGeometry( this.radius, this.detail ),
            material = new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 0xf5c885
            });

        this.mesh = new THREE.Mesh( geometry, material );
    }

    update(value) {
        let rotation = .01 * value,
            scale = 0.25 * value;

        this.mesh.rotation.x += rotation;
        this.mesh.rotation.y += rotation;
        this.mesh.rotation.z += rotation;
        this.mesh.scale.set(scale, scale, scale);
    }
}

export default OctahedronGeometry
