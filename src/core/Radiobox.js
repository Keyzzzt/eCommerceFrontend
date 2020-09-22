import React, {useState} from "react";

const Radiobox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((pricesItem, index) => (
        <div key={index} className="list-unstyled">
            <input name={pricesItem} onChange={handleChange} type="radio" value={`${pricesItem._id}`} className='mr-2 ml-4'/>
            <label className="form-check-label">{pricesItem.name}</label>
        </div>
    ))

    return (
        <>
            {JSON.stringify(prices)}
            <input type='radio' className='mr-2 ml-4'/>
            <label className="form-check-label">Name</label>
        </>
    )
}

export default Radiobox