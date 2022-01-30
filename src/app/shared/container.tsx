/**
 * * Flex box container
 */
import React, { CSSProperties, FunctionComponent } from 'react';
import './container.scss';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    justify?: 'center' | 'start' | 'end';
    style?: CSSProperties;
    innerRef?: React.LegacyRef<HTMLDivElement>;
}

//* The CSS class definition is in app.scss
const classNameMap = {
    center: 'container',
    start: 'container-start',
    end: 'container-end'
}

const Container: FunctionComponent<ContainerProps> = (props) => {
    const { className, style, justify, children, innerRef, ...otherProps } = props;

    return (<div className={`${classNameMap[justify || 'center']} ${className || ''} `}
        style={style} ref={innerRef} {...otherProps}
    >
        {children}
    </div>);
};

export default Container;