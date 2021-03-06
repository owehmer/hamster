import './field.css';
import {Direction, GridMap} from "../field.models";
import {useState} from "react";
import Hamster from "./hamster";
import {HamsterFunctions} from "./hamster.fns";
import HamsterController from "./hamster-controller";

interface PlayingFieldProps {
    gridMap: GridMap
}

export default function PlayingField({gridMap}: PlayingFieldProps) {
    const [hamsterXPos, setHamsterXPos] = useState<number>(() => 0);
    const [hamsterYPos, setHamsterYPos] = useState<number>(() => 0);
    const [direction, setDirection] = useState<Direction>(() => "right");

    function getClassName(xIndex: number, yIndex: number): string {
        const baseClass = 'pf-row--col';
        const classes: string[] = [baseClass];

        switch (gridMap[yIndex][xIndex]) {
            case "empty":
                classes.push(`${baseClass}__empty`);
                break;
            case "wall":
                classes.push(`${baseClass}__wall`);
                break;
        }

        return classes.join(' ');
    }

    function move() {
        HamsterFunctions.move({
            direction,
            grid: gridMap,
            setXPosition: setHamsterXPos,
            setYPosition: setHamsterYPos,
            xPosition: hamsterXPos,
            yPosition: hamsterYPos
        })
    }

    function turnRight() {
        HamsterFunctions.turnRight({direction, setDirection});
    }

    const hamster = <Hamster
        grid={gridMap}
        direction={direction}
    />;

    return (
        <>
            <div className="playing-field" data-testid="playing-field">
                {gridMap.map((row, yIndex) => row.map((col, xIndex) =>
                    <div className={getClassName(xIndex, yIndex)}
                         key={`${yIndex}${xIndex}`}
                         data-testid={'pf-row--col' + yIndex + xIndex}
                    >
                        {yIndex === hamsterYPos && xIndex === hamsterXPos ? hamster : null}
                    </div>
                ))}
            </div>

            <div className="hamster-controller">
                <HamsterController moved={() => move()} turnedRight={() => turnRight()}/>
            </div>
        </>
    )
}
