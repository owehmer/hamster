export default function HamsterController(props: { moved: () => void, turnedRight: () => void }) {
    return (
        <>
            <button onClick={() => props.moved()}>Move</button>
            <button onClick={() => props.turnedRight()}>Turn Right</button>
        </>
    )
}
