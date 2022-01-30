
import React, { FunctionComponent } from 'react';

import { Quest } from '../../types';

import './dot.scss';

export interface DotProps {
    className?: string;
    color?: 'white' | 'rainbow' | Quest['color'];
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    asButton?: boolean;
}

const classNameMap: Record<DotProps['color'], string> = {
    white: 'dot',
    rainbow: 'dot-rainbow',
    gray: 'dot-gray',
    red: 'dot-red',
    orange: 'dot-orange',
    green: 'dot-green',
    blue: 'dot-blue',
    purple: 'dot-purple',
}

const Dot: FunctionComponent<DotProps> = (props) => {
    const { onClick, className, asButton } = props;
    const color = props.color || 'white';

    return (
        <div className={`${className} ${classNameMap[color]} ${onClick || asButton ? 'dot-btn' : ''}`}
            onClick={onClick}
        >
            {props.children}
        </div >
    );
};

export default Dot;