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



//animate function
// function play() {
//     requestAnimationFrame(play);
//     c.clearRect(0, 0, w, h);
    

//     for(var i = 1; i < cellArray.length - 1; i++) {
//         for(var j = 1; j < 70 - 1; j++) {
//             if( cellArray[i][j].alive == true &&  (  neighborSum(cellArray[i][j], i, j) > 3 ||   neighborSum(cellArray[i][j], i, j) < 2 )  ) {
//                 cellArray[i][j].alive = false;
//             }
//             else if(  cellArray[i][j].alive == true  && ( neighborSum(cellArray[i][j], i, j) == 3 || neighborSum(cellArray[i][j], i, j) == 2 )  ) {
//                 cellArray[i][j].alive = true;
//             }
//             else if(cellArray[i][j].alive == false &&  neighborSum(cellArray[i][j], i, j) == 3   ) {
//                 cellArray[i][j].alive = true;
//             }
//         }
//     }
    
//     console.log(cellArray[23][23])

//     for(var i = 0; i < cellArray.length ; i++) {
//         for(var j = 0; j < 70 ; j++) {
//             c.beginPath();
//             //cellArray[i][j].draw();
//             if(cellArray[i][j].alive == true) {
//                 c.fillStyle = 'black';
//                 c.fillRect(cellArray[i][j].x, cellArray[i][j].y, 10, 10);
//             }
//             else if(cellArray[i][j].alive == false){
//                 c.fillStyle = 'white';
//                 c.fillRect(cellArray[i][j].x, cellArray[i][j].y, 10, 10);
//             }
//             c.stroke();
//         }
//     }
    
    
    
// }

// requestAnimationFrame(play);




















































// c.beginPath();
// c.arc(w/2, h/2, 50, 0, Math.PI * 2);
// c.stroke();

// c.fillRect(100,100,200,100);

// c.beginPath();
// c.moveTo(w / 2, h / 2);
// for (var i = 0; i < 111; i++) {
// //     var cw = Math.random() * w;
// //     var ch = Math.random() * h;
// //     c.lineTo(cw, ch);
// // }
// // c.stroke();

// function Zxcv(x, y) {
//     this.x = x;
//     this.y = y;

//     this.draw = function() {
//         c.beginPath();
//         this.x = Math.random() * w;
//         this.y = Math.random() * h;
//         c.arc(this.x, this.y, 50, 0, Math.PI * 2);
//         c.stroke();
//     }
// }


// var zxcArray = [];
// for(var i = 0; i < 100; i++){
//     zxcArray.push(new Zxcv(Math.random() * w, Math.random() * h));
// }

// var x = 200;
// var dx = 1;
// function animate() {

//     // c.clearRect(0,0,w,h);
//     // c.beginPath();
//     // c.arc(x,200, 50, 0, Math.PI * 2);
//     // c.strokeStyle = 'blue';
//     // c.stroke();
//     // requestAnimationFrame(animate);
//     // x += dx;
//     // x = x%w;

//     // var asd = new Zxcv(100, 1);
//     // asd.draw();
//     for(var i = 0; i < 100; i++){
//         zxcArray[i].draw();
//     }


// }

// requestAnimationFrame(animate);