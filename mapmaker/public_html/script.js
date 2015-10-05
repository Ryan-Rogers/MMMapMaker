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
    
    // WASD
    if(event.keyCode == 87 || event.keyCode == 38) selectionY -= 1;
    if(event.keyCode == 83 || event.keyCode == 40) selectionY += 1;
    if(event.keyCode == 65 || event.keyCode == 37) selectionX -= 1;
    if(event.keyCode == 68 || event.keyCode == 39) selectionX += 1;
    
    // Enter
    if(event.keyCode == 13) {
        
        var tile = map[selectionY][selectionX];
        
        // If neither, create just wall
        if(tile[0] === 0 && tile[1] === 0) {
            tile[0] = 1;
        
        // If wall but no ceiling, create both
        } else if(tile[0] === 1 && tile[1] === 0) {
            tile[1] = 1;
        
        // If both, remove just wall
        } else if(tile[0] === 1 && tile[1] === 1) {
            tile[0] = 0;
        
        // If just ceiling, remove just ceiling
        } else {
            tile[1] = 0;
        }
        
        print();
    }
    
    draw();
};

// Printing map
var print = function() {
    /* console.log("[");
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
    console.log("]"); */
    
    var north   = 1;
    var south   = 2;
    var east    = 4;
    var west    = 8;
    
    // wall, ceiling
    for(var column = 1; column < 17; column++) {
        var line = "";
        for(var row = 1; row < 17; row++) {
            var num = ((map[row][column][1] * east)
                    + (map[row][column - 1][1] * west)
                    + (map[row][column][0] * north)
                    + (map[row - 1][column][0] * south));
            line += ("0x" + num.toString(16) + "0, ");
            // if((++count % 16) == 0 ) console.log("\n");
        }
        
        console.log(line);
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
    
    print();
};
