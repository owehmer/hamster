import {Direction, GridMap} from "../field.models";


interface HamsterFunctionProps {
    grid: GridMap,
    direction: Direction,
    xPosition: number,
    setXPosition: (newX: number) => void,
    yPosition: number,
    setYPosition: (newY: number) => void
}

function move(props: HamsterFunctionProps) {
    switch (props.direction) {
        case "up": {
            if (props.yPosition > 0) {
                props.setYPosition(props.yPosition - 1);
            }
            break;
        }
        case "down": {
            if (props.yPosition < props.grid.length - 1) {
                props.setYPosition(props.yPosition + 1);
            }
            break;
        }
        case "left": {
            if (props.xPosition > 0) {
                props.setXPosition(props.xPosition - 1);
            }
            break;
        }
        case "right": {
            if (props.xPosition < props.grid[props.yPosition].length - 1) {
                props.setXPosition(props.xPosition + 1);
            }
            break;
        }
    }
}

interface HamsterTurnProps {
    direction: Direction,
    setDirection: (newDir: Direction) => void,
}

function turnRight(props: HamsterTurnProps) {
    let nextDirection: Direction;
    switch(props.direction) {
        case "up": {
            nextDirection = "right";
            break;
        }
        case "right": {
            nextDirection = "down";
            break;
        }
        case "down": {
            nextDirection = "left";
            break;
        }
        case "left": {
            nextDirection = "up";
            break;
        }
    }
    props.setDirection(nextDirection);
}

export const HamsterFunctions = {
    move,
    turnRight
}
