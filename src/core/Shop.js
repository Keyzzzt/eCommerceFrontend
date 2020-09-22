import React, {useEffect, useState} from "react";
import Layout from './Layout'
import Card from "./Card";
import {getCategories} from "../core/apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import {prices} from "./fixedPrices";
import {getFilteredProducts} from "./apiCore";



const Shop = () => {
    const [categories, setCategories] = useState([])
    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])


    const init = () => {
        getCategories().then(categories => {
            if(categories.error) {
                setError(categories.error)
            } else {
                setCategories(categories)
            }
        })
    }
    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then(response => {
                if(response.error) {
                    setError(response.error)
                }
                setFilteredResults(response.data)
                setSize(response.size)
                setSkip(0)
            })
    }
    const loadMore = (newFilters) => {
        let toSkip = skip + limit
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then(response => {
                if(response.error) {
                    setError(response.error)
                }
                setFilteredResults([...filteredResults, ...response.data])
                setSize(response.size)
                setSkip(toSkip)
            })
    }



    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    },[])

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues

        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }



    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5'>Load more...</button>
            )
        )
    }
    return (
        <Layout title='Shop Page' description='Node React application' className='container-fluid'>
            <div className="row">
                <div className="col-2">
                    <h4>Filter by category</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>

                    </ul>
                    <h4>Filter by price</h4>
                    <div>
                        <Radiobox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
                <div className="col-10">
                    <h2 className='mb-4'>Products</h2>
                    <div className="row">
                        {filteredResults.map((product, index) => (
                                <Card key={index} product={product} />
                        ))}


                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop