import React from 'react';
import {DropdownButton, InputGroup, FormControl, Button, Dropdown} from 'react-bootstrap'
import '../styles/sortbar.css'

class Sortbar extends React.Component {

    render() {
        return(
            <div className="sortbar-container">
                <DropdownButton id="dropdown-basic-button" title="Sorter etter">
                    <Dropdown.Item href="#/action-1">Nyeste</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Alfabetisk</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Mestpopulære</Dropdown.Item>
                </DropdownButton>
                <InputGroup className="mb-3 searchfield">
                    <FormControl
                        placeholder="Halden brygge"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Søk</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}

export default Sortbar;