import {GridMap} from "../field.models";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import PlayingField from "./field";

describe('hamster fns', () => {
    function generateBasicGrid(size: number) {
        const emptyLSState: GridMap = new Array(size).fill(undefined)
            .map(() => new Array(size).fill(undefined)
                .map(() => "empty"));

        return emptyLSState;
    }

    function getHamster() {
        return screen.getByTestId('hamster');
    }

    it('the hamster controller is visible', () => {
        act(() => {
            render(<PlayingField gridMap={generateBasicGrid(1)}/>);
        });

        const moveBtn = screen.getByTestId('hamster-controller__move-btn');
        const turnRightBtn = screen.getByTestId('hamster-controller__turn-right-btn');

        expect(moveBtn).toBeInTheDocument();
        expect(turnRightBtn).toBeInTheDocument();
    });

    it('should render the hamster at 0|0 at the beginning facing right', () => {
        act(() => {
            render(<PlayingField gridMap={generateBasicGrid(2)}/>);
        });

        const field = screen.getByTestId('playing-field');
        const hamsterStartNode = screen.getByTestId('pf-row--col00');
        const hamster = getHamster();

        expect(field).toBeInTheDocument();
        expect(hamsterStartNode).not.toBeEmptyDOMElement();
        expect(hamsterStartNode).toContainElement(hamster.parentElement);
        expect(hamster).toHaveClass('hamster', 'hamster__right');
    });

    it('the hamster rotates right when the turn right btn is clicked', () => {
        act(() => {
            render(<PlayingField gridMap={generateBasicGrid(2)}/>);
        });

        const turnRightBtn = screen.getByTestId('hamster-controller__turn-right-btn');
        const hamster = getHamster();

        turnRightBtn.click();
        expect(hamster).toHaveClass('hamster__down');
        turnRightBtn.click();
        expect(hamster).toHaveClass('hamster__left');
        turnRightBtn.click();
        expect(hamster).toHaveClass('hamster__up');
        turnRightBtn.click();
        expect(hamster).toHaveClass('hamster__right');
    });

    it('the hamster walks in the direction it is facing when the move button is clicked but cant move out of the grid', () => {
        act(() => {
            render(<PlayingField gridMap={generateBasicGrid(2)}/>);
        });

        function moveOverflowCheck(node: HTMLElement) {
            expect(node).toContainElement(getHamster());
            for (let i = 0; i < 10; i++) {
                moveBtn.click();
                expect(node).toContainElement(getHamster());
            }
        }

        const moveBtn = screen.getByTestId('hamster-controller__move-btn');
        const turnRightBtn = screen.getByTestId('hamster-controller__turn-right-btn');
        const node00 = screen.getByTestId('pf-row--col00');
        const node01 = screen.getByTestId('pf-row--col01');
        const node10 = screen.getByTestId('pf-row--col10');
        const node11 = screen.getByTestId('pf-row--col11');

        expect(node00).toContainElement(getHamster());
        moveBtn.click();

        moveOverflowCheck(node01);

        turnRightBtn.click();
        moveBtn.click();

        moveOverflowCheck(node11);

        turnRightBtn.click();
        moveBtn.click();

        moveOverflowCheck(node10);

        turnRightBtn.click();
        moveBtn.click();

        moveOverflowCheck(node00);
    });
})
