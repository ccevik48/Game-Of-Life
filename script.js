var cv = document.querySelector('#cv');
var c = cv.getContext('2d');
var h = cv.height;
var w = cv.width;



//Cell class
function Cell(alive, x, y) {
    this.alive = alive;
    this.x = x;
    this.y = y;

    this.draw = function () {
        c.beginPath();
        this.x = x;
        this.y = y;
        if(alive == true) {
            c.fillStyle = 'black';
            c.fillRect(this.x, this.y, 10, 10);
        }
        else if(alive == false){
            c.fillStyle = 'white';
            c.fillRect(this.x, this.y, 10, 10);
        }
        c.stroke();
    }

}


//2d array to contain Cell objects
var cellArray = new Array(100);
for (var i = 0; i < cellArray.length; i++) {
  cellArray[i] = new Array(70);
}

var nextGen = new Array(100);
for (var i = 0; i < nextGen.length; i++) {
    nextGen[i] = new Array(70);
}


for(var i = 0; i < cellArray.length; i++) {
    for(var j = 0; j < 100; j++) {
        var b = Math.round(Math.random() - 0.3);
        if(b == 1) {
            cellArray[i][j] = new Cell(true, i * 10, j * 10);
        }
        else {
            cellArray[i][j] = new Cell(false, i * 10, j * 10);
        }
    }
}

for(var i = 0; i < nextGen.length; i++) {
    for(var j = 0; j < 100; j++) {
        nextGen[i][j] = new Cell(false, i * 10, j * 10);
    }
}









//find number of neghbor cells
function neighborSum(cell, i, j) {
    this.cell = cell;
    this.i = i;
    this.j = j;
    var sum = 0;
    if(cellArray[i - 1][j - 1].alive == true) {
        sum += 1;
    }
    if(cellArray[i][j - 1].alive == true) {
        sum += 1;
    }
    if(cellArray[i - 1][j].alive == true) {
        sum += 1;
    }
    if(cellArray[i + 1][j - 1].alive == true) {
        sum += 1;
    }
    if(cellArray[i - 1][j + 1].alive == true) {
        sum += 1;
    }
    if(cellArray[i + 1][j].alive == true) {
        sum += 1;
    }
    if(cellArray[i][j + 1].alive == true) {
        sum += 1;
    }
    if(cellArray[i + 1][j + 1].alive == true) {
        sum += 1;
    }
    return sum;
}


setInterval(function(){
    c.clearRect(0, 0, w, h);
    

    for(var i = 1; i < cellArray.length - 1; i++) {
        for(var j = 1; j < 70 - 1; j++) {
            if( cellArray[i][j].alive == true &&  (  neighborSum(cellArray[i][j], i, j) > 3 ||   neighborSum(cellArray[i][j], i, j) < 2 )  ) {
                nextGen[i][j].alive = false;
                //cellArray[i][j].alive = false;
            }
            else if(  cellArray[i][j].alive == true  && ( neighborSum(cellArray[i][j], i, j) == 3 || neighborSum(cellArray[i][j], i, j) == 2 )  ) {
                nextGen[i][j].alive = true;
                //cellArray[i][j].alive = true;
            }
            else if(cellArray[i][j].alive == false &&  neighborSum(cellArray[i][j], i, j) == 3   ) {
                nextGen[i][j].alive = true;
                //cellArray[i][j].alive = true;
            }
        }
    }

    for(var i = 0; i < cellArray.length; i++) {
        for(var j = 0; j < 100; j++) {
            cellArray[i][j].alive = nextGen[i][j].alive;
        }
    }

    
    for(var i = 1; i < cellArray.length - 1; i++) {
        for(var j = 1; j < 70 - 1; j++) {
            //cellArray[i][j].draw();
            c.beginPath();
            //cellArray[i][j].draw();
            if(cellArray[i][j].alive == true) {
                c.fillStyle = 'black';
                c.fillRect(cellArray[i][j].x, cellArray[i][j].y, 10, 10);
            }
            else if(cellArray[i][j].alive == false){
                c.fillStyle = 'white';
                c.fillRect(cellArray[i][j].x, cellArray[i][j].y, 10, 10);
            }
            c.stroke();
        }
    }
},500);


