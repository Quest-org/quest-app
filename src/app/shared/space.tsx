/**
 * * Space component
 * width and height can be styled inline
 */
import React, { FunctionComponent } from 'react';

// Components

export interface SpaceProps {
    className?: string;
    width?: string;
    height?: string;
}

const Space: FunctionComponent<SpaceProps> = (props) => (
    <div className={props.className}
        style={{ width: props.width, height: props.height }}>
    </div>
);

export default Space;