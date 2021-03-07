export default function HamsterController(props: { moved: () => void, turnedRight: () => void }) {
    return (
        <>
            <button onClick={() => props.moved()} data-testid="hamster-controller__move-btn">Move</button>
            <button onClick={() => props.turnedRight()} data-testid="hamster-controller__turn-right-btn">Turn Right
            </button>
        </>
    )
}
