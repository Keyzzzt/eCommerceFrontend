import React, {useEffect, useState} from "react";


const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])

    const filterByCategory = (categoryId) => () => {
        // indexOf() returns index of element or -1 if not found
        const currentCategoryId = checked.indexOf(categoryId)
        const newCheckedCategoryId = [...checked]

        // If currently checked was not already in checked state > push
        // else pull / take off
        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(categoryId)
        } else newCheckedCategoryId.splice(currentCategoryId, 1)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input onChange={filterByCategory(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input"/>
            <label htmlFor="" className="form-check-label">{category.name}</label>
        </li>
    ))
}
export default Checkbox