import '../styles/windDirectionSelecter.css'

import React, { useEffect, useState } from 'react';

import Checkbox from './checkbox';
import { IWindDirections } from '../types/types';

interface IProps {
    windDirections: IWindDirections;
    onWindDirectionsChange: (windDirections: IWindDirections) => void;
}

function WindDirectionSelecter({windDirections, onWindDirectionsChange}:IProps): JSX.Element {

    //Plan: on submit poster til eget table med spotID som referanse til riktig spot

    const [SV, setSV] = useState(windDirections.SV);
    const [V, setV] = useState(windDirections.V);
    const [NV, setNV] = useState(windDirections.NV);
    const [N, setN] = useState(windDirections.N);
    const [NØ, setNØ] = useState(windDirections.NØ);
    const [Ø, setØ] = useState(windDirections.Ø);
    const [SØ, setSØ] = useState(windDirections.SØ);
    const [S, setS] = useState(windDirections.S);

    useEffect(() => {
        const updateWindDirections = () => {
            const newWindDirections = {
                SV: SV,
                V: V,
                NV: NV,
                N: N,
                NØ: NØ,
                Ø: Ø,
                SØ: SØ,
                S: S
            }
            onWindDirectionsChange(newWindDirections);
        }
        updateWindDirections();
    }, [SV, V, NV, N, NØ, Ø, SØ, S])

    return(
        <div className="checkbox-container">
            <Checkbox label="SV" state={SV} onChange={setSV}/>
            <Checkbox label="V" state={V} onChange={setV}/>
            <Checkbox label="NV" state={NV} onChange={setNV}/>
            <Checkbox label="N" state={N} onChange={setN}/>
            <Checkbox label="NØ" state={NØ} onChange={setNØ}/>
            <Checkbox label="Ø" state={Ø} onChange={setØ}/>
            <Checkbox label="SØ" state={SØ} onChange={setSØ}/>
            <Checkbox label="S" state={S} onChange={setS}/>
        </div>
    );
}

export default WindDirectionSelecter;