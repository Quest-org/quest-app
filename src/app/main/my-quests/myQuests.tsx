import React, { useState, FunctionComponent, useCallback, useEffect } from 'react';

// Components
import Container from '../../shared/container';
import Dot from '../../shared/dot';
import { IconPlus } from '../../shared/icons';
import Plate from '../../shared/plate';
import Text from '../../shared/text';
import { Input, Popover, Radio, message } from 'antd';
import TagSelect from './tagSelect';
import QuestCard from './questCard';

// Interfaces
import { Quest } from '../../../types';
import { RadioGroupProps } from 'antd';
import { TagColor } from './tagSelect';
import { QuestCardProps } from './questCard';

import { getUserQuestIdList } from '../../mocks';

const Spinner = require('../../../assets/spinner.svg');
import './myQuests.scss';

type DisplayMode = 'list' | 'card';
export interface MyQuestsProps {
    statusFilter: Quest['status'] | '/';
}

const MyQuests: FunctionComponent<MyQuestsProps> = (props) => {
    const { statusFilter } = props;

    const [msg, msgContext] = message.useMessage();

    const [tagColor, setTagColor] = useState<TagColor>('rainbow');
    const [searchText, setSearchText] = useState<string>(null);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('card');
    const [questIds, setQuestIds] = useState<string[]>(null);

    //* Handle display mode changes
    const handleDisplayChange = useCallback<RadioGroupProps['onChange']>(() => {
        setDisplayMode(displayMode === 'card' ? 'list' : 'card');
    }, [displayMode, setDisplayMode]);

    //* Handle quest deletion
    const handleDelete = useCallback<QuestCardProps['onDelete']>((which) => {
        const newIds = questIds.concat();
        newIds.splice(newIds.indexOf(which.id), 1);
        setQuestIds(newIds);
        msg.success({
            content: < Text id='myQuests.onDelete' values={{ title: which.title }} />,
            style: { marginTop: '80vh' }
        });
    }, [questIds, msg]);

    const handleMissing = useCallback<QuestCardProps['onMissing']>((which) => {
        const newIds = questIds.concat();
        newIds.splice(newIds.indexOf(which.id), 1);
        setQuestIds(newIds);
        msg.error({
            content: <Text id='myQuests.onMissing' values={{ title: which.title }} />,
            style: { marginTop: '80vh' }
        });
    }, [questIds, msg]);

    //* Query quest id list
    useEffect(() => {
        setQuestIds(null);  //* Get into loading mode
        const tagColorFilter = tagColor === 'rainbow' ? '/' : tagColor;
        getUserQuestIdList(statusFilter, tagColorFilter, searchText).then(setQuestIds).catch(console.log);
    }, [statusFilter, tagColor, searchText]);

    return (
        <Container className='my-quests' justify='start'>
            <Plate className='my-quests--control'>
                {/* Create questionnaire button */}
                <Dot className='my-quests--control--create-btn' onClick={() => console.log('TODO: new quest btn')}>
                    <Text icon={<IconPlus className='my-quests--control--create-btn--icon' />}
                        textClass='my-quests--control--create-btn--text'
                        id='myQuests.newQuest'
                    />
                </Dot>
                <Container className='my-quests--control--filter' justify='end'>
                    {/* Rainbow tag filter */}
                    <Popover className='my-quests--control--filter-popover'
                        content={<TagSelect color={tagColor} onChange={setTagColor} hintId='tagSelect.filterTag' showRainbow />}
                        trigger='click' placement='bottom'>
                        <Dot color={tagColor} className='my-quests--control--filter--marker' asButton />
                    </Popover>
                    {/* Search box */}
                    <Input.Search className='my-quests--control--filter--search'
                        onSearch={setSearchText} />
                </Container>
                {/* Display mode */}
                <Radio.Group className='my-quests--control--filter--radio-group'
                    optionType='button'
                    buttonStyle='solid'
                    value={displayMode}
                    onChange={handleDisplayChange}
                >
                    <Radio.Button className={`my-quests--control--filter--radio-list ${displayMode === 'list' ? 'my-quests--display--active' : ''}`}
                        value='list'>
                        <Text id='myQuests.listMode' />
                    </Radio.Button>
                    <Radio.Button className={`my-quests--control--filter--radio-card ${displayMode === 'card' ? 'my-quests--display--active' : ''}`}
                        value='card'>
                        <Text id='myQuests.cardMode' />
                    </Radio.Button>
                </Radio.Group>
            </Plate>
            <Plate className={questIds ? 'my-quests--content' : 'my-quests--content-loading'}>{questIds
                ? [0, 1, 2, 3].map(colIdx => (
                    <Container className='my-quests--content--column' key={colIdx}>{
                        questIds.filter((qid, idx) => idx % 4 == colIdx).map(qid => (
                            <QuestCard questId={qid} key={qid} className='my-quests--content--card'
                                onDelete={handleDelete} onMissing={handleMissing} />
                        ))
                    }</Container>
                ))
                : <img src={Spinner} alt='Please wait...' />
            }</Plate>
            {msgContext}
        </Container >
    );
};

export default MyQuests;