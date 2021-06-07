import '../styles/allSpots.css'

import { ISelectedWindDirections, ISpot, defaultSelectedWindDirections } from '../types/types';
import {Link, withRouter} from 'react-router-dom'
import React, {useEffect, useState} from 'react';

import { Button } from 'react-bootstrap';
import CardList from '../components/cardList'
import Header from '../components/header'
import Sortbar from '../components/sortbar';
import {getAllSpots} from '../api-service';

function AllSpots() {
    const [spots, setSpots] = useState([]);
    const [sortBy, setSortBy] = useState("Alphabetical")
    const [searchWord, setSearchWord] = useState("");
    const [selectedWindDirections, setSelectedWindDirections] = useState<ISelectedWindDirections>(defaultSelectedWindDirections);

    document.title = `Windsurf Norge - Steder å windsurfe`

    useEffect(() => {
        const fetchData = async () => {
            const allSpots = await getAllSpots();
            setSpots(allSpots);
        }
        fetchData();
    }, [])

    const sort = (spotsToSort: ISpot[], sortMethod:string) => {
        let spots = spotsToSort;
        if(sortMethod === "Alphabetical") {
            spots = spots.sort((spot1, spot2) => {
                if(spot1.name < spot2.name) { return -1; }
                if(spot1.name > spot2.name) { return 1; }
                return 0;
            });
        }
        else if(sortMethod === "Newest") {
            spots = spots.sort((spot1, spot2) => new Date(spot2.created).valueOf() - new Date(spot1.created).valueOf());
        }
        else if(sortMethod === "Most popular") {
            spots = spots.sort((spot1, spot2) => spot2.views - spot1.views);
        }
        else if(sortMethod === "Rating") {
            spots = spots.sort((spot1, spot2) => spot2.rating - spot1.rating);
        }
        return spots
    }

    const onSelectedWindDirectionsChange = (windDirection: string) => {
        let newSelectedWindDirections = selectedWindDirections
        switch(windDirection){
            case "sv":
                newSelectedWindDirections = {...selectedWindDirections, sv: !selectedWindDirections.sv}
                break;
            case "v":
                newSelectedWindDirections = {...selectedWindDirections, v: !selectedWindDirections.v}
                break;
            case "nv":
                newSelectedWindDirections = {...selectedWindDirections, nv: !selectedWindDirections.nv}
                break;
            case "n":
                newSelectedWindDirections = {...selectedWindDirections, n: !selectedWindDirections.n}
                break; 
            case "nø":
                newSelectedWindDirections = {...selectedWindDirections, nø: !selectedWindDirections.nø}
                break; 
            case "ø":
                newSelectedWindDirections = {...selectedWindDirections, ø: !selectedWindDirections.ø}
                break; 
            case "sø":
                newSelectedWindDirections = {...selectedWindDirections, sø: !selectedWindDirections.sø}
                break; 
            case "s":
                newSelectedWindDirections = {...selectedWindDirections, s: !selectedWindDirections.s}
                break;
            default:
                break;
        }
        setSelectedWindDirections(newSelectedWindDirections);
    }

    const windDirectionFilter = (spots: ISpot[]) => {
        let SVSpots: ISpot[] = [];
        let VSpots: ISpot[] = [];
        let NVSpots: ISpot[] = [];
        let NSpots: ISpot[] = [];
        let NØSpots: ISpot[] = [];
        let ØSpots: ISpot[] = [];
        let SØSpots: ISpot[] = [];
        let SSpots: ISpot[] = [];

        if(selectedWindDirections.sv) {
            SVSpots = spots.filter((spot: ISpot) => spot.sv === "good" || spot.sv ==="ok")
        }
        if(selectedWindDirections.v) {
            VSpots = spots.filter((spot: ISpot) => spot.v === "good" || spot.v ==="ok")
        }
        if(selectedWindDirections.nv) {
            NVSpots = spots.filter((spot: ISpot) => spot.nv === "good" || spot.nv ==="ok")
        } 
        if(selectedWindDirections.n) {
            NSpots = spots.filter((spot: ISpot) => spot.n === "good" || spot.n ==="ok")
        } 
        if(selectedWindDirections.nø) {
            NØSpots = spots.filter((spot: ISpot) => spot.nø === "good" || spot.nø ==="ok")
        } 
        if(selectedWindDirections.ø) {
            ØSpots = spots.filter((spot: ISpot) => spot.ø === "good" || spot.ø ==="ok")
        } 
        if(selectedWindDirections.sø) {
            SØSpots = spots.filter((spot: ISpot) => spot.sø === "good" || spot.sø ==="ok")
        } 
        if(selectedWindDirections.s) {
            SSpots = spots.filter((spot: ISpot) => spot.s === "good" || spot.s ==="ok")
        }
        if(!selectedWindDirections.sv && !selectedWindDirections.v && !selectedWindDirections.nv && !selectedWindDirections.n && 
            !selectedWindDirections.nø && !selectedWindDirections.ø && !selectedWindDirections.sø && !selectedWindDirections.s) {
                return spots;
            }
        const returnSpots: ISpot[] = []
        //@ts-ignore
        return [...new Set(returnSpots.concat(SVSpots, VSpots, NVSpots, NSpots, NØSpots, ØSpots, SØSpots, SSpots))];
    }

    return(
        <div className="allSpots-container">
            <Header
                title="Steder å windsurfe"
            />
            <Sortbar
                onSearchWordChange={setSearchWord}
                onSortbyChange={setSortBy}
                onSelectedWindDirectionsChange={onSelectedWindDirectionsChange}
                selectedWindDirections={selectedWindDirections}
            />
            <div className="add-spot-button">
                <Link to="/addSpot"><Button className="add-spot-button  ">Legg til spot</Button></Link>
            </div>
            {spots.length === 0 ?
                <div className="empty"></div>
                :
                <CardList 
                    spots={windDirectionFilter(sort(spots.filter((spot:ISpot) => spot.name.toLowerCase().includes(searchWord.toLowerCase())), sortBy))}
                />
            }
        </div>
    )
}

export default withRouter(AllSpots);