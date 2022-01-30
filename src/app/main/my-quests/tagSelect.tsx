import React, { FunctionComponent, useCallback } from 'react';

// Components
import Text from '../../shared/text';
import Dot from '../../shared/dot';
import { Spin } from 'antd';

// Interfaces
import { Quest } from '../../../types/index';
import Container from '../../shared/container';

import './tagSelect.scss';

export type TagColor = Quest['color'] | 'rainbow';
export interface TagSelectProps {
    color: TagColor;
    onChange: (current: TagColor, before: TagColor) => void;
    hintId: string;
    showRainbow?: boolean;
    loading?: boolean;
}

const tagColors: TagColor[] = ['rainbow', 'gray', 'red', 'orange', 'green', 'blue', 'purple'];
const tagColorsNoRainbow: Quest['color'][] = ['gray', 'red', 'orange', 'green', 'blue', 'purple'];

const TagSelect: FunctionComponent<TagSelectProps> = (props) => {
    const { color, onChange, hintId, showRainbow, loading } = props;

    const handleMarkerClick = useCallback((which: TagColor) => {
        if (which !== color) onChange(which, color);
    }, [color, onChange]);

    const shownColors = showRainbow ? tagColors : tagColorsNoRainbow;

    return (
        <Container className='tag-select'>
            <Container className='tag-select--colors'>{
                shownColors.map((clr) => {
                    const dot = (<Dot className='tag-select--colors--dot' key={clr}
                        color={clr} onClick={() => { if (!loading) handleMarkerClick(clr); }} />);
                    return clr === color
                        ? (<Container key={clr} className='tag-select--colors--cur-color'>
                            {dot}
                            <Dot className='tag-select--colors--cur-color--mark' />
                        </Container>)
                        : dot;

                })
            }</Container>
            <Text id={hintId} className='tag-select--text' />
            {loading ? <Spin /> : null}
        </Container>
    );
};

export default TagSelect;