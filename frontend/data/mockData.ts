import { Experiment } from '../types';

export const experiments: Experiment[] = [
  {
    id: '1',
    title: "Newton's Second Law",
    shortDescription: "Explore the relationship between force, mass, and acceleration in a friction-less environment.",
    fullContent: "This simulation allows students to manipulate the mass of an object and the force applied to it to observe the resulting acceleration. By plotting the data, users can verify F=ma. The virtual environment eliminates air resistance and friction, providing ideal experimental conditions.",
    imageUrl: "https://picsum.photos/id/1/800/600",
    videoUrl: "",
    category: "Mechanics",
    date: "2025-10-15"
  },
  {
    id: '2',
    title: "Simple Pendulum",
    shortDescription: "Investigate how length and gravity affect the period of a pendulum.",
    fullContent: "In this experiment, you will change the length of the string and the mass of the bob. You can also simulate the experiment on different planets to see how gravity affects the oscillation period. The small-angle approximation is visually demonstrated.",
    imageUrl: "https://picsum.photos/id/20/800/600",
    videoUrl: "",
    category: "Waves & Oscillations",
    date: "2025-11-02"
  },
  {
    id: '3',
    title: "Ohm's Law Circuit",
    shortDescription: "Build a virtual circuit to measure voltage, current, and resistance.",
    fullContent: "Connect batteries, resistors, and wires in this drag-and-drop circuit builder. Use the virtual multimeter to measure voltage drops and current flow. Graph your results to determine the resistance of unknown components.",
    imageUrl: "https://picsum.photos/id/48/800/600",
    videoUrl: "",
    category: "Electricity",
    date: "2025-09-20"
  },
  {
    id: '4',
    title: "Projectile Motion",
    shortDescription: "Launch projectiles at different angles and speeds to study trajectories.",
    fullContent: "Fire a cannonball and observe its parabolic path. Adjust the initial velocity, launch angle, and height. Enabling air resistance shows how real-world trajectories differ from ideal theoretical models.",
    imageUrl: "https://picsum.photos/id/76/800/600",
    videoUrl: "",
    category: "Kinematics",
    date: "2025-12-05"
  },
  {
    id: '5',
    title: "Thermodynamics: Gas Laws",
    shortDescription: "Analyze the relationship between pressure, volume, and temperature.",
    fullContent: "A piston-cylinder assembly contains an ideal gas. Heat or cool the gas, compress or expand the volume, and watch the pressure gauge. The simulation visualizes the kinetic theory of gases at the molecular level.",
    imageUrl: "https://picsum.photos/id/119/800/600",
    videoUrl: "",
    category: "Thermodynamics",
    date: "2025-01-10"
  },
  {
    id: '6',
    title: "Optics: Snell's Law",
    shortDescription: "Observe light refraction through different mediums like water and glass.",
    fullContent: "Shine a laser beam through a prism or interface between two media. Measure the angles of incidence and refraction with a virtual protractor to calculate the refractive index of unknown materials.",
    imageUrl: "https://picsum.photos/id/180/800/600",
    videoUrl: "",
    category: "Optics",
    date: "2025-02-14"
  }
];