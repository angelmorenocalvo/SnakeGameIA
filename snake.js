class Snake{
    constructor(brain){
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        this.score = 0;
        this.food = this.pickLocation();
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(9, 24, 4);
        }
        this.total++;
        this.update();
        
        this.total++;
        this.update();

        this.total++;
        this.update();
    }

    dir(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
    dispose(){
        this.brain.dispose();
    }
    mutate() {
        this.brain.mutate(0.1);
    }
    think() {
        let eye = this.eyes();
        let inputs = [];
        inputs[0] = this.x / width; // posicion cabeza eje x
        inputs[1] = this.y / height; // posicion cabeza eje y
        inputs[2] = this.food.x / width; // posicion comida eje x
        //inputs[2] = dist(this.x/width, this.y/height, this.food.x/width, this.food.y/height);
        inputs[3] = this.get_angle();
        inputs[4] = this.food.y / height; // posicion comida eje y
        inputs[5] = eye[0] / width; // limite arriba
        inputs[6] = eye[1] / width;// limite abajo
        inputs[7] = eye[2] / width;// limite izquierda
        inputs[8] = eye[3] / width;// limite derecha
        let output = this.brain.predict(inputs); // 0 up / 1 down / 2 left / 3 right
    
        if(output[0] === max([output[0],output[1],output[2], output[3]])){
            this.dir(0, -1);
        }else if(output[1] === max([output[0],output[1],output[2], output[3]])){
            this.dir(0,1);
        }else if(output[3] === max([output[0],output[1],output[2], output[3]])){
            this.dir(1,0);
        }else if(output[2] === max([output[0],output[1],output[2], output[3]])){
            this.dir(-1,0);
        }

    }
    get_angle(){
        let a = createVector(this.x/width, this.y/height);
        let b = createVector(this.food.x/width, this.food.y/height);
        return Math.atan(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y) / Math.PI;
    }

    eyes(){
        min = [0,600,0,600] // Up, Down, Left, Right
        for(var i = 0; i < this.tail.length-1;i++){

            if(this.x === this.tail[i].x){

                let subs = this.y - this.tail[i].y;
                if( subs<=0){
                    if((this.tail[i].y < min[1])){
                        min[1] = this.tail[i].y;
                    }
                    
                }
                else{
                    if((this.tail[i].y > min[0])){
                        min[1] = this.tail[i].y;
                    }
                }
            }
            else{
                if(this.y === this.tail[i].y){
                    if(this.x - this.tail[i].x <=0){
                        if((this.tail[i].x < min[3])){
                            min[3] = this.tail[i].x;
                        }
                    }
                    else{
                        if((this.tail[i].x > min[2])){
                            min[2] = this.tail[i].x;
                        }
                    }
                }
            }
        }
        return min;
    }


    death(){
        for(var i = 0; i < this.tail.length; i++){
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                print("death");
                this.total = 0;
                this.tail = [];
                return true;
            }
        }
        return false;
    }

    eat(){
        var d = dist(this.x, this.y, this.food.x, this.food.y);
        
        if(d < 1){
            this.score+= 1;
            this.total++;
            this.pickLocation();
            return true;
        }else{
            return false;
        }
    }

    update(){
        if(this.total === this.tail.length){
            for(var i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
        // Hace que el valor sea referido a una escala
        // en este caso entre lo ancho y la escala scl

        //if(dist(this.x, this.y, this.food.x, this.food.x)>dist(this.tail[this.total-1].x, this.tail[this.total-1].y, this.food.x, this.food.x)){
        //    this.score--;
        //}
        
    }

    pickLocation(){
    
        var cols = floor(width/scl);
        var rows = floor(height/scl);
        
        var f = createVector(floor(random(cols)), floor(random(rows)));
        return f.mult(scl);
    
    }
    

    show(){
        fill(255);
        for(var i = 0; i< this.tail.length; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}
