/**
 * * An icon followed with text
 */

import React, { ReactNode, FunctionComponent, CSSProperties } from 'react';

// Components
import { FormattedMessage } from 'react-intl';
import Container from './container';

// Interfaces
import { Props as FormattedMessageProps } from 'react-intl/lib/src/components/message';

export interface IconTextProps extends FormattedMessageProps {
    className?: string; // The className of the container
    textClass?: string; // The className of the span element
    icon?: ReactNode;   // Icon. if null, Container will not be rendered
    style?: CSSProperties
    textStyle?: CSSProperties,
}

const Text: FunctionComponent<IconTextProps> = (props) => {
    const { className, textClass, icon, style, textStyle, ...msgProps } = props;

    const textFinalClass = icon ? textClass : textClass || className;
    const textFinalStyle = icon ? textStyle : textStyle || style;
    const textComponent = (<span className={textFinalClass} style={textFinalStyle}>
        <FormattedMessage {...msgProps} />
    </span >);

    return icon ? (
        <Container justify='start' className={className} style={style}>
            {icon}
            {textComponent}
        </Container>
    ) : textComponent;
};

export default Text;