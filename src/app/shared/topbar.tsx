import React, { FunctionComponent, useContext, useMemo, useCallback } from 'react';
import { Col, Row } from 'antd';

// Components
import Plate from './plate';
import Dot from './dot';
import Container from './container';
import { IconAlarm, IconBack } from './icons';
import { UserCtx } from '../../utils/user';
import { Select } from 'antd';
const { Option } = Select;

// Assets
const logoText = require('../../assets/logo-text.png');
import './topbar.scss';

// Interfaces
import { Quest } from '../../types';
import { SelectProps } from 'antd';
import { FormattedMessage } from 'react-intl';

export interface TopBarProps {
    showBackBtn?: boolean;
    showCurQuest?: boolean;

    // Current quest. This prop must be assigned if the prop showCurQuest is true.
    curQuestIdx?: number;
    // An array of quest that contains. This prop must be assigned if the prop showCurQuest is true.
    quests?: Partial<Quest>[];
    /**
     * Callback function called when user selects a different quest.
     * This prop must be assigned if the prop showCurQuest is true.
     * @param current Index of the quest before user selection
     * @param before Index of the quest user is trying to select
     * @return Should the current quest been updated?
     */
    onCurQuestChange?: (current: number, before: number) => void;

    //* Just for fun
    onLocaleSwitch?: () => void;
}

const optionFilter: SelectProps['filterOption'] = (input, option) => {
    const optionNode = option.children as unknown as any;
    return (optionNode.props.children[1].props.children as string).toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== -1;
}

const TopBar: FunctionComponent<TopBarProps> = (props) => {
    const user = useContext(UserCtx);
    const { showBackBtn, showCurQuest, curQuestIdx, quests, onCurQuestChange } = props;

    // Validate props
    if (showCurQuest && !validateProps(curQuestIdx, onCurQuestChange))
        throw new Error('Props validation failed. Need to specify related props When the showCurQuest property is true.');

    // Generate option list when quests changes
    const questOptions = useMemo(() =>
        quests ? quests.map((elem, idx) => (
            <Option key={elem.id} value={idx} >
                {<Container justify='start'>
                    <Dot className='topbar--cur-quest--select--option--color-mark'
                        color={elem.color} />
                    <span className='topbar--cur-quest--select--option--text'>{elem.title}</span>
                </Container >
                }
            </Option>)) : null
        , [quests]);

    const handleSelectChange = useCallback<(value: number) => void>(
        (value) => { onCurQuestChange(curQuestIdx, value) },
        [curQuestIdx, onCurQuestChange]);

    return (
        <Plate className='topbar'>
            <Row justify='center' align='middle'>
                {/* Go back button and current questionnaire */}
                <Col span={11} className='container-start'>
                    {showBackBtn ?
                        (<Dot className='topbar--back' onClick={() => console.log("Todo: back btn logic")}>
                            <IconBack className='topbar--back--icon' />
                        </Dot>) : null
                    }
                    {showCurQuest ? (<>
                        <label className='topbar--cur-quest--label'>
                            <FormattedMessage id='topbar.currentQuest' />
                        </label>

                        <Select showSearch className='topbar--cur-quest--select'
                            optionFilterProp='children'
                            filterOption={optionFilter}
                            onChange={handleSelectChange}
                            value={curQuestIdx}
                        >{questOptions}</Select></>) : null
                    }

                </Col>
                {/* Logo(text) */}
                <Col span={2}>
                    <img src={logoText} className='topbar--logo-text' />
                </Col>
                {/* Current user */}
                <Col span={11} className='container-end'>
                    {/* Delete this ! */}
                    <Dot asButton className='switch-locale' onClick={() => { if (props.onLocaleSwitch) props.onLocaleSwitch() }} >中/En</Dot>
                    <Dot className='topbar--user--alarm' asButton>
                        <IconAlarm className='topbar--user--alarm--icon' />
                    </Dot>
                    <Plate className='topbar--user--info'>
                        <img className='topbar--user--info--avatar'
                            src={user.avatarUrl}
                            alt={user.username[0].toLocaleUpperCase()}
                        />
                        <span className='topbar--user--info--username'>{user.username}</span>
                    </Plate>
                </Col>
            </Row>
        </Plate >
    );
};

export default TopBar;

function validateProps(...props: any[]): boolean {
    for (const prop of props)
        if (prop === undefined || prop === null)
            return false;
    return true;
}