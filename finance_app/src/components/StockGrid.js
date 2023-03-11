import './StockGrid.css';

function StockRow(props) {
    return (
        <div className="StockRow">
            <button>
                {props.name}
            </button>
            <button>
                Long/Short
            </button>
            <button>
                # of Shares
            </button>
        </div>
    )
}

function StockGrid() {
    return (
        <div>
            <StockRow 
                name="Stock name"
            />
        </div>
    )
}

export default StockGrid;