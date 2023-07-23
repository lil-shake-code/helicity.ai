export default class RigidBody {
  constructor(position, velocity, mass) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
  }

  applyForce(force) {
    // Calculate the acceleration based on the force and mass
    const acceleration = force.divide(this.mass);

    // Update the velocity based on the acceleration
    this.velocity = this.velocity.add(acceleration);
  }

  // Update the position based on the velocity
  update() {
    this.position = this.position.add(this.velocity);
  }
}
