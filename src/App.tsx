import React, {useEffect, useState} from 'react';
import './App.css';
import PlayingField from "./field/field";
import {GRID_LS_KEY, GridMap} from "./field.models";

function App() {
    const [gridMap] = useState<GridMap>(() => {
        let gridJson = localStorage.getItem(GRID_LS_KEY) || '';

        if (gridJson === '') {
            const emptyLSState: GridMap = new Array(3).fill(undefined)
                .map(() => new Array(3).fill(undefined)
                    .map(() => "empty"));

            gridJson = JSON.stringify(emptyLSState);
        }

        const gridContents = JSON.parse(gridJson) as GridMap;

        return gridContents;
    });

    useEffect(() => {
        localStorage.setItem(GRID_LS_KEY, JSON.stringify(gridMap));
    }, [gridMap]);

    return (
        <div className="App">
            <PlayingField gridMap={gridMap}/>
        </div>
    );
}

export default App;
