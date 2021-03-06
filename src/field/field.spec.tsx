import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import PlayingField from "./field";
import {GRID_LS_KEY, GridMap} from "../field.models";

describe('useEntries', () => {
    beforeEach(() => {
        localStorage.setItem(GRID_LS_KEY, '');
    });

    afterEach(() => {
        localStorage.setItem(GRID_LS_KEY, '');
    })

    it('can render the input correctly', () => {
        const map: GridMap = new Array(3).fill(undefined)
            .map(() => new Array(3).fill(undefined)
                .map(() => "empty"));

        act(() => {
            render(<PlayingField gridMap={map}/>);
        });

        const wrapper = screen.getByTestId('playing-field');

        expect(wrapper).not.toBeEmptyDOMElement();

        let entryNodes = screen.getAllByTestId(/^pf-row--col/);
        expect(entryNodes).toHaveLength(9);

        for (const node of entryNodes) {
            expect(node).toHaveClass('pf-row--col pf-row--col__empty', {exact: true});
        }

    })
})
