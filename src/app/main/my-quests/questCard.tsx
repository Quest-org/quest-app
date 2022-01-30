import React, { useState, FunctionComponent, useMemo, useEffect, useRef, useCallback } from 'react';

// Components
import Plate from '../../shared/plate';
import Text from '../../shared/text';
import Container from '../../shared/container';
import Dot, { DotProps } from '../../shared/dot';
import { Popover, Menu, Skeleton, message } from 'antd';
import { IconRefresh, IconTrash, IconPause, IconEditUnderline, IconMenu, IconPlay } from '../../shared/icons';
import { FormattedDate } from 'react-intl';
import Space from '../../shared/space';
import ConfirmModal, { ActionType } from './confirmModal';
import TagSelect from './tagSelect';

// Interfaces
import { Quest } from '../../../types';
import { MenuItemProps } from 'antd';
import { ActionType as CfmDialogPresetType } from './confirmModal';

// Mocks
import { getQuestById, setQuestStatus, markQuest, deleteQuest } from '../../mocks';
import { markColorMap } from '../../../utils/colors';

import './questCard.scss';

type MenuAction = ActionType | 'tag' | 'edit';
export interface QuestCardProps {
    className?: string;
    questId: string;
    onMissing: (which: Partial<Quest>) => void;
    onDelete: (which: Partial<Quest>) => void;
}

//* Maps questionnaire status to intl message id
const statusTextMap: Record<Quest['status'], string> = {
    'undeployed': 'quest.status.undeployed',
    'deployed': 'quest.status.deployed',
    'paused': 'quest.status.paused',
    'ended': 'quest.status.ended',
    'error': 'quest.status.error',
}

const QuestCard: FunctionComponent<QuestCardProps> = (props) => {
    const { questId, onMissing, onDelete, className } = props;
    const [msg, msgCtx] = message.useMessage();

    const [quest, setQuest] = useState<Partial<Quest>>(null);
    const [showMenuPopover, setShowMenuPopover] = useState<boolean>(false);

    //* Menu action confirmation dialog states
    const [cfmDialogPreset, setCfmDialogPreset] = useState<CfmDialogPresetType>(null);
    const [showCfmDialog, setShowCfmDialog] = useState<boolean>(false);
    const [cfmDialogOkLoading, setCfmDialogOkLoading] = useState<boolean>(false);

    //* Refresh icon DOM node reference
    const refreshIconRef = useRef<HTMLDivElement>(null);

    //* Quest tag select panel(shown when menu item 'tag' triggered)
    const [showTagSelect, setShowTagSelect] = useState<boolean>(false);
    const [tagSelectLoading, setTagSelectLoading] = useState<boolean>(false);

    //* Query quest info: only when quest is null
    useEffect(() => {
        if (quest) return;
        getQuestById(questId)
            .then(setQuest)
            .catch(() => { onMissing(quest); });
    }, [quest, onMissing, questId]);

    // Handles menu item clicked
    const handleMenuItemClick = useCallback<MenuItemProps['onClick']>((info) => {
        switch (info.key as MenuAction) {
            case 'delete': case 'pause': case 'continue':
                setCfmDialogPreset(info.key as CfmDialogPresetType);
                setShowCfmDialog(true);
                setShowMenuPopover(false);
                break;
            case 'edit':
                break;
            case 'tag':
                setShowTagSelect(true);
                break;
        }
    }, []);

    // Handles menu action(delete/pause/continue) confirmed
    const handleMenuActionConfirm = useCallback(async (action: MenuAction, color?: Quest['color']) => {
        try {
            switch (action) {
                case 'delete':
                    setCfmDialogOkLoading(true);
                    await deleteQuest(quest.id);
                    setCfmDialogOkLoading(false);
                    setShowCfmDialog(false);
                    onDelete(quest);
                    break;
                case 'pause': case 'continue':
                    setCfmDialogOkLoading(true);
                    const modifiedStatus = action === 'pause' ? 'paused' : 'deployed';
                    await setQuestStatus(quest.id, modifiedStatus);
                    setQuest(Object.assign({}, quest, { status: modifiedStatus }));
                    setCfmDialogOkLoading(false);
                    setShowCfmDialog(false);
                    msg.success({
                        content: (<Text values={{ title: quest.title }}
                            id={action === 'pause' ? 'questCard.onPause' : 'questCard.onContinue'} />),
                        style: { marginTop: '80vh' }
                    })
                    break;
                case 'edit':
                    break;
                case 'tag':
                    setTagSelectLoading(true);
                    await markQuest(quest.id, color);
                    setQuest(Object.assign({}, quest, { color }));
                    setTagSelectLoading(false);
                    setShowTagSelect(false);
                    break;
            }
        } catch (errCode) {
            onMissing(errCode);
        }
    }, [onMissing, quest, onDelete, msg]);

    // Handles refreshing answer count
    const handleRefreshIconClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(() => {
        // Show spin animation
        const animateClass = 'quest-card--info--line1--count--refresh-icon--clicked';
        const node = refreshIconRef.current.children[0];
        node.classList.add(animateClass);
        setTimeout(() => { node.classList.remove(animateClass) }, 1000);
    }, []);

    // * Drop down menu
    const menu = useMemo(() => (quest ?
        <Menu className='quest-card--menu' selectedKeys={null}
            onClick={(handleMenuItemClick)}>
            <Menu.Item key='delete' className='quest-card--menu--menu-item'>
                <Text className='quest-card--menu--delete' id='questCard.delete'
                    icon={<IconTrash className='quest-card--menu--menu-item--icon' />} />
            </Menu.Item>
            {/* The pause item should be disabled if the status is not 'deployed' or 'paused' */}
            <Menu.Item key={quest.status === 'paused' ? 'continue' : 'pause'} className='quest-card--menu--menu-item'
                disabled={!(quest.status === 'deployed' || quest.status === 'paused')}>{
                    quest.status === 'paused'
                        ? <Text className='quest-card--menu--continue'
                            id={'questCard.continue'}
                            icon={<IconPlay className='quest-card--menu--menu-item--icon' />} />
                        : <Text className='quest-card--menu--pause'
                            id={'questCard.pause'}
                            icon={<IconPause className='quest-card--menu--menu-item--icon' />} />
                }
            </Menu.Item>
            {/* Seperate dangerous actions */}
            <Space height='15px' width='100%' />
            <Menu.Item key='edit' className='quest-card--menu--menu-item'>
                <Text className='quest-card--menu--edit' id='questCard.edit'
                    icon={<IconEditUnderline className='quest-card--menu--menu-item--icon' />} />
            </Menu.Item>
            <Menu.Item key='tag' className='quest-card--menu--menu-item'>
                <Popover placement='top' visible={showTagSelect && showMenuPopover} onVisibleChange={setShowTagSelect}
                    content={<TagSelect color={quest.color} showRainbow={false} hintId='tagSelect.changeColor' loading={tagSelectLoading}
                        onChange={(current) => handleMenuActionConfirm('tag', current as Quest['color'])} />}>
                    <Text className='quest-card--menu--tag' id='questCard.switchTagColor'
                        icon={<Dot color={quest.color} className='quest-card--menu--menu-item--icon' />} />
                </Popover>
            </Menu.Item>
        </Menu> : null
    ), [quest, showTagSelect, showMenuPopover, tagSelectLoading, handleMenuItemClick, handleMenuActionConfirm]);

    //* Modal dialog for Menu action confirmation
    const cfmDialog = useMemo(() => {
        if (!showCfmDialog) return null;
        return <ConfirmModal preset={cfmDialogPreset} quest={quest}
            visible={showCfmDialog}
            onCancel={() => setShowCfmDialog(false)}
            closable={false}
            onOk={() => handleMenuActionConfirm(cfmDialogPreset)}
            okBtnLoading={cfmDialogOkLoading} />;
    }, [quest, showCfmDialog, cfmDialogOkLoading, cfmDialogPreset, handleMenuActionConfirm]);

    //* Status dot color
    const statusDotColor: DotProps['color'] = quest?.status === 'paused' ? 'orange' : 'white';

    return (
        <Plate className={`quest-card ${className ? className : ''}`} borderColor={quest ? quest.color : null}>
            <Skeleton active loading={!quest}>{
                quest ? (<>
                    {/* Quest title */}
                    <p className='quest-card--title'>{quest.title}</p>
                    <div className='quest-card--sep-line' />
                    {/* Quest Description */}
                    <p className='quest-card--descrip'>{quest.descrip}</p>
                    {/* Quest information panel */}
                    <Container className='quest-card--info' style={{ backgroundColor: markColorMap[quest.color] }}>
                        {/* Line 1: Quest status and current respondents */}
                        <Container className='quest-card--info--line1'>
                            <Dot className='quest-card--info--line1--status-dot' color={statusDotColor} />
                            <Text id={statusTextMap[quest.status]} />
                            <Container className='quest-card--info--line1--count'>{[
                                // The current respondents text shows only when the quest goes after deployment
                                quest.status !== 'undeployed'
                                    ? <Text id='questCard.count' key='count' // To pass the compiler check
                                        values={{ "valid": quest.validAnswerCount, "all": quest.answerCount }} />
                                    : null,
                                quest.status === 'deployed'
                                    ? <Container innerRef={refreshIconRef} key='refresh'// To pass the compiler check
                                        onClick={handleRefreshIconClick}>
                                        <IconRefresh className='quest-card--info--line1--count--refresh-icon' />
                                    </Container>
                                    : null
                            ]}
                            </Container>
                        </Container>
                        {/* Line 2: Quest time descriptor and menu btn */}
                        <Container className='quest-card--info--line2'>
                            {getTimeDescriptor(quest)}
                            <Popover className='quest-card--info--line2--menu'
                                content={menu} trigger='click' visible={showMenuPopover}
                                onVisibleChange={setShowMenuPopover}
                                placement='rightBottom'>
                                <Text className='quest-card--info--line2--menu--text' id='questCard.menu' />
                                <IconMenu className='quest-card--info--line2--menu--icon' />
                            </Popover>
                        </Container>
                    </Container></>)
                    : null
            }
            </Skeleton>
            {/* Menu action confirmation modal dialog */}
            {cfmDialog}
            {msgCtx}
        </Plate >
    );
};

export default QuestCard;

/**
 * * Finds proper time descriptor for a questionnaire.
 * e.g. A quest in 'undeployed' status, will generate
 * Created Time {quest.createdTime}
 * The date time string is formatted to the current locale
 * @param quest
 * @returns
 */
function getTimeDescriptor(quest: Partial<Quest>) {
    let msgId: string = null, timeValue: Date = null;
    switch (quest.status) {
        case 'undeployed':
            msgId = 'quest.createdTime';
            timeValue = quest.createdTime;
            break;
        case 'deployed':
            msgId = 'quest.deployedTime';
            timeValue = quest.deployedTime;
            break;
        case 'paused':
            msgId = 'quest.lastPausedTime';
            timeValue = quest.lastPausedTime;
            break;
        case 'ended':
            msgId = 'quest.endedTime';
            timeValue = quest.endedTime;
            break;
        case 'error':
            break;
    }

    if (!msgId) return null;
    return (<>
        <Text id={msgId} />
        <span className='quest-card--info--line2--time-str'>
            <FormattedDate value={timeValue}
                {...timeValue.getFullYear() === (new Date()).getFullYear() ? null : 'numeric'}
                month='short'
                day='numeric'
                hour12={false}
                hour='2-digit'
                minute='2-digit'
            />
        </span>
    </>);
}
