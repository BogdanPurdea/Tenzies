export default function Die(props) {
    const { id, value, isHeld } = props.dieObj

    const style = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
     const renderPips = () => {
        switch (value) {
            case 1:
                return <div className="pip center"></div>;
            case 2:
                return (
                    <>
                        <div className="pip top-left"></div>
                        <div className="pip bottom-right"></div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="pip top-left"></div>
                        <div className="pip center"></div>
                        <div className="pip bottom-right"></div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="pip top-left"></div>
                        <div className="pip top-right"></div>
                        <div className="pip bottom-left"></div>
                        <div className="pip bottom-right"></div>
                    </>
                );
            case 5:
                return (
                    <>
                        <div className="pip top-left"></div>
                        <div className="pip top-right"></div>
                        <div className="pip center"></div>
                        <div className="pip bottom-left"></div>
                        <div className="pip bottom-right"></div>
                    </>
                );
            case 6:
                return (
                    <>
                        <div className="pip top-left"></div>
                        <div className="pip top-right"></div>
                        <div className="pip middle-left"></div>
                        <div className="pip middle-right"></div>
                        <div className="pip bottom-left"></div>
                        <div className="pip bottom-right"></div>
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <button
            style={style}
            onClick={() => props.holdFunc(id)}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
            className="die-face"
        >
            {renderPips()}
        </button>
    )
}