import '../styles/sortbar.css'

import {Button, Dropdown, DropdownButton, FormControl, InputGroup} from 'react-bootstrap'

import { ISelectedWindDirections } from '../types/types';
import React from 'react';

interface IProps {
    onSearchWordChange: (event: any) => void;
    onSortbyChange: (sort: string) => void;
    onSelectedWindDirectionsChange: (windDirections: string) => void;
    selectedWindDirections: ISelectedWindDirections
}

const Sortbar = ({onSearchWordChange, onSortbyChange, onSelectedWindDirectionsChange, selectedWindDirections}: IProps) => {


    return(
        <div className="sortbar-container">
            <div className="sortbar-left-side">
                <DropdownButton id="dropdown-basic-button" title="Sorter etter">
                    <Dropdown.Item onClick={() => onSortbyChange("Newest")}>Nyeste</Dropdown.Item>
                    <Dropdown.Item onClick={() => onSortbyChange("Alphabetical")}>Alfabetisk</Dropdown.Item>
                    <Dropdown.Item onClick={() => onSortbyChange("Most popular")}>Mestpopulære</Dropdown.Item>
                    <Dropdown.Item onClick={() => onSortbyChange("Rating")}>Rating</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Vindretninger">
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.sv} onChange={() => onSelectedWindDirectionsChange("sv")}/><label>SV</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.v} onChange={() => onSelectedWindDirectionsChange("v")}/><label>V</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.nv} onChange={() => onSelectedWindDirectionsChange("nv")}/><label>NV</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.n} onChange={() => onSelectedWindDirectionsChange("n")}/><label>N</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.nø} onChange={() => onSelectedWindDirectionsChange("nø")}/><label>NØ</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.ø} onChange={() => onSelectedWindDirectionsChange("ø")}/><label>Ø</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.sø} onChange={() => onSelectedWindDirectionsChange("sø")}/><label>SØ</label></div>
                    <div className="sortbar-checkbox-container"><input type="checkbox" defaultChecked={selectedWindDirections.s} onChange={() => onSelectedWindDirectionsChange("s")}/><label>S</label></div>
                </DropdownButton>
            </div>
            <InputGroup className="mb-3 searchfield">
                <FormControl
                    placeholder="Spot"
                    onChange={(event) => onSearchWordChange(event.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Søk</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default Sortbar;