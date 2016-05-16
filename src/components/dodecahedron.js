import THREE from 'three';

class DodecahedronGeometry {
    constructor() {
        this.radius = 50;
        this.detail = 0;

        const geometry = new THREE.DodecahedronGeometry( this.radius, this.detail ),
            material = new THREE.MeshBasicMaterial({
                wireframe: true,
                color: 0x3c4683
            });

        this.mesh = new THREE.Mesh( geometry, material );
    }

    update(value) {
        let rotation = .01 * value,
            scale = 5 * value;

        this.mesh.rotation.x += rotation;
        this.mesh.rotation.y += rotation;
        this.mesh.rotation.z += rotation;
        this.mesh.scale.set(scale, scale, scale);
    }
}

export default DodecahedronGeometry
