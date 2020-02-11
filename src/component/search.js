import React, {useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

function Search(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let [planetList,setPlanetList] = useState([]);

    useEffect(() => {
        axios.get('https://swapi.co/api/planets/')
        .then(res =>{
            setPlanetList (setPlanetList => res.data.results );
        })
        .catch((error) => {
            console.log(error);
        })
      },[]);


      const handleInputChange = (event) => {
         planetList = [...planetList];
        let sortedPlanetList = planetList.filter( planet => planet.name.toLowerCase().includes((event.target.value).toLowerCase()));
        setPlanetList (setPlanetList => sortedPlanetList);
      }

     

    return(
        <React.Fragment>
             { !currentUser && <Redirect to="/login" /> } 

            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group searchBar">
                        <input className="form-control" placeholder="Search Planets..." onChange={handleInputChange} type="text"/>
                    </div>
                </div>
            </div>
            
            
            <div className="tags-cover">
              {planetList.map(planet =>(
                 <span style={ {fontSize: planet.population > 30000000 ? '1.5em' : '1em' } }  key={planet.name} className="planetName">{planet.name} </span> 
            ))}
            </div>
          
          <div>
               <strong>Note</strong> If population greater then 30000000 then font size will be 1.5 em else 1em.
          </div>

        </React.Fragment>
    )
}

export default Search;
