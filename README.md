# EcoCritters 🐸🐣

EcoCritters is a fun interactive ecosystem simulation built with React that models how articicial selection affects organisms generation after geenration. The project visualizes disrupting wildlife has negative effects.

## Features

***Creature Generation** – Randomly generates creatures with traits such as speed and behavior.
**Population Tracking** – Uses charts to visualize ecosystem changes over time.
***Real-time Simulation** – Creatures move and interact dynamically during the simulation.

## Tech Stack

* **React**
* **JavaScript**
* **Recharts** (for data visualization)
* **HTML / CSS**

## How It Works

1. Creatures are generated with random attributes.
2. Choose to feed a particular creature
3. Creatures population size rapildly increases, forcing other creatures into extinction
4. Population changes are tracked and visualized using charts.

## Installation

Clone the repository:

```bash
git clone https://github.com/ebubenwasike/ecoCritters.git
```

Navigate into the project folder:

```bash
cd ecoCritters
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Project Structure

```
ecoCritters/
│
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   ├── creatures/
│   │   └── food.png
│   └── components/
│
├── public/
└── README.md
```

(Run App.jsx)

## Future Improvements

* Add reproduction and evolution mechanics
* Introduce predator/prey relationships
* Improve AI behavior for creatures
* Add more ecosystem variables (weather, terrain)

## Author

**Ebube Nwasike** <33333🩷🌞


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
