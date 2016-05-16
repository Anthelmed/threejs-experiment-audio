class ParticlesEmmiter {
    constructor(particles) {
        this.particles = particles;
    }

    update(value) {
        for (let particle of this.particles) {
            particle.update(value);
        }
    }
}

export default ParticlesEmmiter
