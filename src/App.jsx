import { useState, useEffect } from "react";
import chick from "./assets/creatures/chick.png";
import frog from "./assets/creatures/frog.png";
import worm from "./assets/creatures/worm.png";
import lizard from "./assets/creatures/lizard.png";
import food from "./assets/food.png";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function generateCreature(id, species) {
  return {
    id,
    species,

    speed: 0.5,
    camouflage: 0.5,
    intelligence: 0.5,
    energy: 0.5,

    x: Math.random() * 90,
    y: Math.random() * 90,

    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2
  };
}

function generatePopulation(size) {
  return Array.from({ length: size }, (_, i) => generateCreature(i));
}

function calculateFitness(creature, population) {

  const species = getCreatureSprite(creature);

  const counts = {
    chick: population.filter(c => getCreatureSprite(c) === chick).length,
    frog: population.filter(c => getCreatureSprite(c) === frog).length,
    worm: population.filter(c => getCreatureSprite(c) === worm).length,
    lizard: population.filter(c => getCreatureSprite(c) === lizard).length
  };

  const total = population.length;

  const speciesCount =
    species === chick ? counts.chick :
    species === frog ? counts.frog :
    species === worm ? counts.worm :
    counts.lizard;

  const share = speciesCount / total;

  const traitFitness =
    0.25 * creature.speed +
    0.25 * creature.camouflage +
    0.25 * creature.intelligence +
    0.25 * creature.energy;

  // NORMAL ECOSYSTEM: encourage balance
  if (share < 0.4) {
    const balanceFitness = 1 - Math.abs(share - 0.25);
    return 0.7 * balanceFitness + 0.3 * traitFitness;
  }

  // OVERFED ECOSYSTEM: dominance takes over
  return 0.7 * share + 0.3 * traitFitness;
}

function selectSurvivors(population) {
  return population;
}

function mutate(value) {
  return value;
}

function reproduce(parent) {
  return {
    id: Math.floor(Math.random() * 100000),
    species: parent.species,

    speed: parent.speed,
    camouflage: parent.camouflage,
    intelligence: parent.intelligence,
    energy: parent.energy,

    x: parent.x + (Math.random() - 0.5) * 20,
    y: parent.y + (Math.random() - 0.5) * 20,

    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2
  };
}

function evolvePopulation(population) {
  return population;
}

function getCreatureSprite(creature) {

  if (creature.species === "chick") return chick;

  if (creature.species === "frog") return frog;

  if (creature.species === "lizard") return lizard;

  return worm;
}

function App() {
  const [population, setPopulation] = useState([]);
  const [generation, setGeneration] = useState(1);
  const [fitnessHistory, setFitnessHistory] = useState([]);

  useEffect(() => {
    const initialPopulation = [
  ...Array.from({ length: 12 }, (_, i) => generateCreature(i, "chick")),
  ...Array.from({ length: 12 }, (_, i) => generateCreature(i + 12, "frog")),
  ...Array.from({ length: 13 }, (_, i) => generateCreature(i + 24, "lizard")),
  ...Array.from({ length: 13 }, (_, i) => generateCreature(i + 37, "worm"))
];

    const populationWithFitness = initialPopulation.map((creature) => ({
      ...creature,
      fitness: calculateFitness(creature, initialPopulation)
    }));

    setPopulation(populationWithFitness);
  }, []);

  useEffect(() => {

    const interval = setInterval(() => {
  
      setPopulation((pop) =>
        pop.map((creature) => {
      
          let newX =
  creature.x +
  creature.dx * (0.3 + creature.speed) * 3 +
  (Math.random() - 0.5) * 4;

let newY =
  creature.y +
  creature.dy * (0.3 + creature.speed) * 3 +
  (Math.random() - 0.5) * 4;
  
          // repel nearby creatures
          pop.forEach((other) => {
            if (other.id === creature.id) return;
      
            const dx = creature.x - other.x;
            const dy = creature.y - other.y;
      
            const dist = Math.sqrt(dx * dx + dy * dy);
      
            if (dist < 6) {
              newX += dx * 0.3;
              newY += dy * 0.3;
            }
          });
      
          if (newX <= 0 || newX >= 90) {
            creature.dx *= -1;
          }
          
          if (newY <= 0 || newY >= 90) {
            creature.dy *= -1;
          }
          
          newX = Math.max(0, Math.min(90, newX));
          newY = Math.max(0, Math.min(90, newY));
      
          return {
            ...creature,
            x: newX,
            y: newY
          };
        })
      );
    }, 1000);
  
    return () => clearInterval(interval);
  
  }, []);

  function feedCreature(creature) {

    const species = getCreatureSprite(creature);
  
    setPopulation(pop => {
  
      if (pop.length > 120) return pop;
  
      const sameSpecies = pop.filter(c => getCreatureSprite(c) === species);
  
      const babies = sameSpecies.map(parent => ({
        ...reproduce(parent),
        fitness: calculateFitness(parent, pop)
      }));
  
      return [...pop, ...babies];
  
    });
  }
  function runEvolution() {

    setPopulation(pop => {
  
      const counts = {
        chick: pop.filter(c => c.species === "chick").length,
        frog: pop.filter(c => c.species === "frog").length,
        lizard: pop.filter(c => c.species === "lizard").length,
        worm: pop.filter(c => c.species === "worm").length
      };
  
      const maxSpecies = Object.keys(counts).reduce((a,b) =>
        counts[a] > counts[b] ? a : b
      );
  
      const values = Object.values(counts);
      const balanced = Math.max(...values) - Math.min(...values) < 5;
  
      let newPop = [...pop];
  
      if (!balanced) {
  
        // dominant species reproduces
        const dominant = pop.filter(c => c.species === maxSpecies);
  
        const babies = dominant.map(parent => ({
          ...reproduce(parent),
          fitness: parent.fitness
        }));
  
        newPop = [...newPop, ...babies];
  
        // weaker species start dying
        newPop = newPop.filter(creature => {
  
          if (creature.species === maxSpecies) return true;
  
          return Math.random() > 0.35; // weaker species die
        });
  
      }
  
      return newPop.slice(0,120);
  
    });
  
    setFitnessHistory(history => {

      const avg =
        population.reduce((sum, c) => sum + c.fitness, 0) /
        population.length;
    
      return [
        ...history,
        { generation: generation + 1, fitness: avg }
      ];
    
    });

    setGeneration(g => g + 1);
  }

  const averageFitness =
    population.length > 0
      ? population.reduce((sum, creature) => sum + creature.fitness, 0) /
        population.length
      : 0;

      const chickCount = population.filter(c => getCreatureSprite(c) === chick).length;
const frogCount = population.filter(c => getCreatureSprite(c) === frog).length;
const wormCount = population.filter(c => getCreatureSprite(c) === worm).length;
const lizardCount = population.filter(c => getCreatureSprite(c) === lizard).length;


      return (
        <div className="app">
          <h1 className="title">Evolution Simulator</h1>
<p className="subtitle">
🌱 a visual effect of disrupting natural ecosystems by feeding wildflife 🌱
</p>

          <h2 className="gennum">GENERATION {generation}</h2>
      
          <button className="evolveButton" onClick={runEvolution}>
  Next Generation
</button>

          <p>Feed them some ramen? See how it can affect later generations</p>
          <p> *Drag and drop unto a specific organism*</p>
      
          <div className="simArea">

  <div className="foodIcon" draggable>
    <img src={food} alt="food"/>
  </div>

  {/* Ecosystem */}
  <div className="world">
    {population.map((creature) => (
      <div
        key={creature.id}
        className="creature"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => feedCreature(creature)}
        style={{
          left: `${creature.x}%`,
          top: `${creature.y}%`,
          width: `${32 + creature.intelligence * 6}px`,
          height: `${32 + creature.intelligence * 6}px`
        }}
      >
        <img src={getCreatureSprite(creature)} alt="creature" />
      </div>
    ))}
  </div>

  {/* Graph BELOW ecosystem */}
  <div className="chartPanel">

    <h3>Evolution of Population Fitness</h3>

    <LineChart width={400} height={160} data={fitnessHistory}>
      <XAxis dataKey="generation" stroke="#ffffff"/>
      <YAxis domain={[0,1]} stroke="#ffffff"/>
      <Tooltip/>
      <Line
        type="monotone"
        dataKey="fitness"
        stroke="#00ff9c"
        strokeWidth={3}
        dot={false}
      />
    </LineChart>

  </div>

</div>
  {/* Population Stats */}
<div className="population-stats">
  <h3>Population Stats</h3>
  <p>🐥 Chicks: {chickCount}</p>
  <p>🐸 Frogs: {frogCount}</p>
  <p>🪱 Worms: {wormCount}</p>
  <p>🦎 Lizards: {lizardCount}</p>
</div>
   
    {/* Explanation */}
<div className="explanation">
  {/* Explanation */}
  <h3>Why This Simulation Matters</h3>
  <p>
    This ecosystem begins in a balanced state where all species coexist with
    similar populations. In real ecosystems, predators, resources, and
    competition help maintain this balance.
  </p>

  <p>
    When humans interfere—such as by feeding wildlife—one species may gain an
    artificial advantage. Its population can grow rapidly, outcompeting others
    for space and resources and eventually disrupting the ecosystem.
  </p>

  <p>
    This simulation demonstrates why feeding wild animals can destabilize
    ecosystems and why wildlife experts encourage observing animals without
    interfering in their natural environment.
  </p>
</div>
</div>
);
    }
export default App;