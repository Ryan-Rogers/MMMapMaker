/* 
 * Author: Ryan Rogers
 * Created: 7/19/2015
 */

// Initialization
var tileWidth;
var width;
var height;
var tile;
var printLn;
var selectionX;
var selectionY;

// Map
// 17x17x2
// Column x Row x [wall, ceiling]
var map = [
[[1,0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[1,1]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[1,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0]],
[[0,0],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1]]
]
;

// Canvas
var canvas = document.getElementById("scriptCanvas");
var context = canvas.getContext("2d");

// Left-click
var keyUp = function(event) {
    
    var tile = map[selectionY][selectionX];
    
    // WASD
    if(event.keyCode == 87) selectionY -= 1;
    else if(event.keyCode == 83) selectionY += 1;
    else if(event.keyCode == 65) selectionX -= 1;
    else if(event.keyCode == 68) selectionX += 1;
    
    // Toggling walls with just up and right
    else if(event.keyCode == 38) { // Up
        if(tile[1] == 1) tile[1] = 0;
        else tile[1] = 1;
        print();
    } else if(event.keyCode == 39) { // Right
        if(tile[0] == 1) tile[0] = 0;
        else tile[0] = 1;
        print();
    }
    
    draw();
};

// Printing map
var print = function() {
    
    var north   = 1;
    var south   = 2;
    var east    = 4;
    var west    = 8;
    
    // wall, ceiling
    var output = "";
    for(var column = 1; column < 17; column++) {
        for(var row = 1; row < 17; row++) {
            var num = ((map[row][column][1] * east)
                    + (map[row][column - 1][1] * west)
                    + (map[row][column][0] * north)
                    + (map[row - 1][column][0] * south));
            output += ("0x" + num.toString(16) + "0, ");
        }
        
        document.getElementById("output").value = output;
        
    }
};

// Draw current map
var draw = function() {
    
    // Sizing
    width = 500;
    
    // Clearing previous map
    context.fillStyle = "black";
    context.fillRect(0, 0, width, width); // x, y, width, height
    
    // Drawing horizontal lines
    context.fillStyle = "white";
    for(var line = 0; line < 500; line += 2) {
        context.fillRect(0, line, width, 1);
    }
    
    // Cutting up horizontal lines
    context.fillStyle = "black";
    for(var line = 0; line < 500; line += 2) {
        context.fillRect(line, 0, 1, width);
    }
    
    // Drawing tiles
    for(var row = 0; row < 17; row++) {
        for(var column = 0; column < 17; column++) { // x, y, width, height
            if(selectionX == row && selectionY == column) 
                    context.fillStyle = "blue";
            context.fillRect(row * 30, (column * 30) + 1, 29, 29);
            if(selectionX == row && selectionY == column) 
                    context.fillStyle = "black";
        }
    }
    
    // Drawing walls
    context.fillStyle = "red";
    for(var row = 0; row < 17; row++) {
        for(var column = 0; column < 17; column++) {
            
            // Walls
            if(map[column][row][0] === 1) {
                context.fillRect((row * 30) + 25, (column * 30) + 1, 4, 29);
            }
            
            // Cielings
            if(map[column][row][1] === 1) {
                context.fillRect((row * 30) - 0, (column * 30) + 1, 29, 4);
            }
        }
    }
};

// At load time
window.onload = function() {
    
    selectionX = 0;
    selectionY = 0;
    
    // Canvas size
    canvas.width = 510;
    canvas.height = 510;
    
    // Initital draw
    draw();
    
    // Mouse Event
    document.addEventListener("keyup", keyUp);
    
    // Textbox
    var outputStyle = document.getElementById("output").style;
    console.log(outputStyle);
    
    outputStyle.width = window.innerWidth - canvas.width - 10 + "px";
    outputStyle.height = "500px";
    
    print();
};
