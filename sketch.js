const TOTAL = 250;
var s = [];
var scl = 20;
var savedSnakes = [];
var counter = 0;


function keyPressed(){
    if(key === 'S'){
        let snake = s[0];
        saveJSON(snake.brain, 'snake.json');
    }
}

function setup(){
    createCanvas(600, 600);
    slider = createSlider(1, 10, 1);
    tf.setBackend('cpu');
    for(let i = 0; i < TOTAL; i++){
        s[i] = new Snake();
        frameRate(10);
    }
    

}




function draw(){
    for(let n = 0; n < 200; n++){
    frameRate(4*slider.value())
    background(51);
    
    counter++;

    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i].death() ){
          savedSnakes.push(s.splice(i, 1)[0]);
        }
    }
    for(let i = 0; i <= s.length-1; i++){
        s[i].think();
        s[i].eat();
        s[i].update();
        
                
        
        s[i].show(); 
        
        fill(255, 0, 100);
        rect(s[i].food.x, s[i].food.y, scl, scl);
    }
    if(counter >= 1000){
        for (let i = s.length - 1; i >= 0; i--) {
              savedSnakes.push(s.splice(i, 1)[0]); // cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
        }
    }
    if (s.length === 0) {
        nextGeneration();
        counter = 0;
    }

}
/*
function keyPressed(){
    if(keyCode === UP_ARROW){
        s.dir(0, -1);
    }else if(keyCode === DOWN_ARROW){
        s.dir(0,1);
    }else if(keyCode === RIGHT_ARROW){
        s.dir(1,0);
    }else if(keyCode === LEFT_ARROW){
        s.dir(-1,0);
    }
}
*/

/*
function move(snake,direction){
    if(direction === 0){
        snake.dir(0, -1);
    }else if(direction === 1){
        snake.dir(0,1);
    }else if(direction === 2){
        snake.dir(1,0);
    }else if(direction === 3){
        snake.dir(-1,0);
    }
}
*/
