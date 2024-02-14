import React, { useEffect, useState } from 'react'
import './Apistyles.css'
import logo from '../logo.svg'

function ApiConnection() {
    const [countries, setCountries] = useState([])
    const [selected, setSelected] = useState()

    useEffect(() => {

        fetch('https://countriesnow.space/api/v0.1/countries/currency', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setCountries(res.data)
            })
            .catch((err) => {
                console.log(err);
                alert()
            })

    }, [])
    const ToFlag = (country) => {
        fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                'iso2': country.iso2
            })
        })
            .then((response) => response.json())
            .then(res => {
                setSelected(res.data)
            })
    }

    return (
        <><div className='container'>
            {countries.map((cntry, index) => <div className='country-list' key={index} onClick={() => ToFlag(cntry)}>{cntry.name}</div>)}
        </div>

            {selected?.flag && <div className='flag-container' onClick={() => setSelected({})}>

                <img src={selected?.flag} alt="" height={'200px'} />
                {selected.name}

            </div>}
        </>

    )
}

export default ApiConnection