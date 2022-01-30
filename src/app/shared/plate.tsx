/**
 * * Background Plate
 * The project's default background card
 */
import React, { FunctionComponent } from 'react';
import './plate.scss';

import { Quest } from '../../types';
import { markColorMap } from '../../utils/colors';

export interface PlateProps {
    className?: string;
    borderColor?: Quest['color'];
    backgroundColor?: Quest['color'];
    noShadow?: boolean;
}

const Plate: FunctionComponent<PlateProps> = (props) => {
    const { borderColor, noShadow, backgroundColor } = props;

    return (
        <div className={props.className + ' plate '} style={{
            borderColor: markColorMap[borderColor],
            backgroundColor: markColorMap[backgroundColor],
            boxShadow: noShadow ? 'none' : null
        }}>
            {props.children}
        </div >
    );
};

export default Plate;