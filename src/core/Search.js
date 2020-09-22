import React, {useEffect, useState} from "react";
import {getCategories, listOfSearchedProduct} from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false,
        error: '',
    })

    const {categories, category, search, results, searched} = data
    const loadCategories = () => {
        getCategories()
            .then(response => {
                if(response.error) {
                    console.log(response.error)
                } else {
                    setData({...data, categories: response})
                }
            })
    }
    useEffect(() => {
        loadCategories()
    }, [])


    const searchData = () => {
        if(search) {
            listOfSearchedProduct({search: search || undefined, category: category})
                .then(response => {
                    if(response.error) {
                        setData({...data, error: response.error})
                    } else {
                        setData({...data, results: response, searched: true})
                    }
                })
        }

    }

    const searchSubmit = (event) => {
        event.preventDefault()
        searchData()
    }
    const handleChange = (action) => (event) => {
        setData({...data, [action]: event.target.value, searched: false })
    }
    const searchedMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return `${results.length} products found`
        }
        if(searched && results.length < 1) {
            return `No products found`
        }
    }
    const searchedProduct = (result = []) => {
        return  (
            <div>
                <h2 className='mt2 mb-4'></h2>
                {searchedMessage(searched, results)}
                <div className='row'>
                    {result.map((product, index) => (<Card key={index} product={product}/>))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
                <span className='input-group-text'>
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select onChange={handleChange('category')} className='btn mr-2 '>
                                <option value="All">All</option>
                                {categories.map((category, index) => (<option key={index} value={category._id}>{category.name}</option>))}
                            </select>
                        </div>
                        <input onChange={handleChange('search')} type="search" className='form-control' placeholder='Search by name'/>
                    </div>
                    <div className="btn input-group-append" style={{border: 'none'}}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
        </form>
    )

    return (
        <div>
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProduct(results)}
            </div>
        </div>
    )
}

export default Search













