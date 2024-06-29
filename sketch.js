
let grid;
let cols, rows;
let w = 10;

function make2DArray(cols, rows) {
    let arr = new Array(cols);

    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);

        for(let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

function setup() {
    createCanvas(600, 800);

    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function mouseDragged() {
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);

    // make sure that mouse is within canvas
    if(col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
        grid[col][row] = 1;
    }
}

function draw() {
    background(0);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            noStroke();
            
            if(grid[i][j] === 1) {
                fill(255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    let nextGrid = make2DArray(cols, rows);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let state = grid[i][j];

            if(state === 1) {
                let below = grid[i][j + 1];
                let belowRight, belowLeft;
                let fallDirection = random(1) < 0.5 ? -1 : 1;

                if(i + fallDirection >= 0 && i + fallDirection <= cols - 1) {
                    belowRight = grid[i + fallDirection][j + 1];
                }
                if(i - fallDirection >= 0 && i - fallDirection <= cols - 1) {
                    belowLeft = grid[i - fallDirection][j + 1];
                }
                
                

                if(below === 0) {
                    nextGrid[i][j + 1] = 1;
                }
                else if(belowRight === 0) {
                    nextGrid[i + fallDirection][j + 1] = 1;
                }
                else if(belowLeft === 0) {
                    nextGrid[i - fallDirection][j + 1] = 1;
                }
                else {
                    nextGrid[i][j] = 1;
                }
            }
        }
    }

    grid = nextGrid;
}


