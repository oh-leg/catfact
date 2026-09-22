interface FactProps {
    fact: string;
}

function Fact({fact}: FactProps) {
    return (
        <div className="fact">
            <h1>Факт о котах</h1>
            {fact}
        </div>
    )
}

export default Fact;