import {Direction, GridMap} from "../field.models";
import './hamster.css';

interface HamsterProps {
    grid: GridMap,
    direction: Direction
}

export default function Hamster(props: HamsterProps) {
    function classNames(): string {
        const baseClass = 'hamster';

        const classes: string[] = [baseClass];

        switch (props.direction) {
            case "up": {
                classes.push(baseClass + '__up');
                break;
            }
            case "down": {
                classes.push(baseClass + '__down');
                break;
            }
            case "left": {
                classes.push(baseClass + '__left');
                break;
            }
            case "right": {
                classes.push(baseClass + '__right');
                break;
            }
        }
        return classes.join(' ');
    }
    return (
        <div className={classNames()} data-testid="hamster"/>
    )
}
