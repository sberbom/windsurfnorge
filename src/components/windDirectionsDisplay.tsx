import '../styles/windDirectionsDisplay.css'

import { IWindDirections, WindDirectionsValues } from '../types/types';

import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';

interface IProps {
    windDirections: IWindDirections;
}

const WindDirecitonsDisplay= ({windDirections}: IProps) => {

    const getColor = (quality: WindDirectionsValues) => {
        if(quality === 'bad') {
            return '#dc3545';
        }
        else if(quality === 'ok') {
            return '#ffc107';
        }
        return '#28a745';
    }

    return(
        <PieChart 
            className = "sb-piechart"
            paddingAngle={2}
            startAngle={22.5}
            label={({dataEntry}) => dataEntry.title}
            labelPosition={75}
            data={[
                { title: 'SØ', value: 12.5, color: getColor(windDirections.sø) },
                { title: 'S', value: 12.5, color: getColor(windDirections.s) },
                { title: 'SV', value: 12.5, color: getColor(windDirections.sv) },
                { title: 'V', value: 12.5, color: getColor(windDirections.v) },
                { title: 'NV', value: 12.5, color: getColor(windDirections.nv) },
                { title: 'N', value: 12.5, color: getColor(windDirections.n) },
                { title: 'NØ', value: 12.5, color: getColor(windDirections.nø) },
                { title: 'Ø', value: 12.5, color: getColor(windDirections.ø) },
                ]}
        />
    )
}

export default WindDirecitonsDisplay;  