import '../styles/windDirectionSelecter.css'

import React, { useEffect, useState } from 'react';

import Checkbox from './checkbox';
import { IWindDirections } from '../types/types';

interface IProps {
    windDirections: IWindDirections;
    onWindDirectionsChange: (windDirections: IWindDirections) => void;
}

function WindDirectionSelecter({windDirections, onWindDirectionsChange}:IProps): JSX.Element {

    const [SV, setSV] = useState(windDirections.sv);
    const [V, setV] = useState(windDirections.v);
    const [NV, setNV] = useState(windDirections.nv);
    const [N, setN] = useState(windDirections.n);
    const [NØ, setNØ] = useState(windDirections.nø);
    const [Ø, setØ] = useState(windDirections.ø);
    const [SØ, setSØ] = useState(windDirections.sø);
    const [S, setS] = useState(windDirections.s);

    useEffect(() => {
        const updateWindDirections = () => {
            const newWindDirections = {
                sv: SV,
                v: V,
                nv: NV,
                n: N,
                nø: NØ,
                ø: Ø,
                sø: SØ,
                s: S
            }
            onWindDirectionsChange(newWindDirections);
        }
        updateWindDirections();
    }, [SV, V, NV, N, NØ, Ø, SØ, S, onWindDirectionsChange])

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