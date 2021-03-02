import './field.css';
import {useEffect, useState} from "react";

export const GRID_LS_KEY = 'GRID_LS_KEY';

type GridContent = 'empty' | 'wall';

export default function PlayingField() {
    const [entries, setEntries] = useState<GridContent[][]>(() => {
        let gridJson = localStorage.getItem(GRID_LS_KEY) || '';

        if (gridJson === '') {
            const emptyLSState: GridContent[][] = new Array(3).fill(undefined)
                .map(() => new Array(3).fill(undefined)
                    .map(() => "empty"));

            gridJson = JSON.stringify(emptyLSState);
        }

        const gridContents = JSON.parse(gridJson) as GridContent[][];

        return gridContents;
    });

    useEffect(() => {
        localStorage.setItem(GRID_LS_KEY, JSON.stringify(entries));
    }, [entries]);

    function getClassName(xIndex: number, yIndex: number): string {
        const baseClass = 'pf-row--col';
        const classes: string[] = [baseClass];

        switch (entries[yIndex][xIndex]) {
            case "empty":
                classes.push(`${baseClass}__empty`);
                break;
            case "wall":
                classes.push(`${baseClass}__wall`);
                break;
        }

        return classes.join(' ');
    }

    return (
        <div className="playing-field" data-testid="playing-field">
            {entries.map((row, yIndex) => row.map((col, xIndex) =>
                <div className={getClassName(xIndex, yIndex)}
                     key={`${yIndex}${xIndex}`}
                     data-testid={'pf-row--col' + yIndex + xIndex}
                />
            ))}
        </div>
    )
}
