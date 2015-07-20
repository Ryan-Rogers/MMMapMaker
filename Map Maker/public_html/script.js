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
var mouseDown = function(event) {
    tile = map[Math.floor((event.y / 30))][Math.floor((event.x / 30))];
    
    // If neither, create just wall
    if(tile[0] === 0 && tile[1] === 0) {
        tile[0] = 1;
    
    // if wall but no ceiling, create both
    } else if(tile[0] === 1 && tile[1] === 0) {
        tile[1] = 1;
    
    // if both, remove just wall
    } else if(tile[0] === 1 && tile[1] === 1) {
        tile[0] = 0;
    
    // if just ceiling, remove just ceiling
    } else {
        tile[1] = 0;
    }
    
    // Update
    draw();
    print();
};

// Printing map
var print = function() {
    console.log("[");
    for(var row = 0; row < 17; row++) {
        printLn = "[";
        for(var column = 0; column < 17; column++) {
            printLn += ("[" + map[row][column][0] + ", " + map[row][column][1] 
                    + "]");
            if(column !== 16) {
                printLn += ",";
            }
        }
        printLn += "]";
        if(row !== 16) {
            printLn += ",";
        }
        console.log(printLn);
    }
    console.log("]");
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
            context.fillRect(row * 30, (column * 30) + 1, 29, 29);
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
    
    // Canvas size
    canvas.width = 510;
    canvas.height = 510;
    
    // Initital draw
    draw();
    
    // Mouse Event
    canvas.addEventListener("mousedown", mouseDown);
};