function nextGeneration() {
    console.log('next generation');
    calculateFitness();
    for (let i = 0; i < TOTAL; i++) {
      s[i] = pickOne();
    }
    for (let i = 0; i < TOTAL; i++) {
      savedSnakes[i].dispose();
    }
    savedSnakes = [];
  }
  
/*
  function pickOne(){
      snake =  savedSnakes[savedSnakes.length -1];
      let child = new Snake(snake.brain);
      child.mutate();
      return child;
  }
*/

  
  function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
      r = r - savedSnakes[index].fitness;
      index++;
    }
    index--;
    let snake = savedSnakes[index];
    let child = new Snake(snake.brain);
    child.mutate();
    return child;
  }
  
  function calculateFitness() {
    let sum = 0;
    for (let snake of savedSnakes) {
      sum += snake.score;
    }
    for (let snake of savedSnakes) {
      snake.fitness = snake.score / sum;
    }
  }