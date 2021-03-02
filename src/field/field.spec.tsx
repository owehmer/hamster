import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayingField, {GRID_LS_KEY} from "./field";

describe('useEntries', () => {
    beforeEach(() => {
        localStorage.setItem(GRID_LS_KEY, '');
    });

    afterEach(() => {
        localStorage.setItem(GRID_LS_KEY, '');
    })

    it('should have all empty fields when initialized without localstorage', () => {
        act(() => {
            render(<PlayingField/>);
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
