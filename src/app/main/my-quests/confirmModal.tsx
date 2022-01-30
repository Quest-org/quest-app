/**
 * * Quest Card menu action confirmation dialog
 * This component uses inline-style if served with specific props
 *
 * title
 * --------------------------------------
 *     actionMsg    quest.title
 * questInfoProp    quest[questInfoProp]
 * 
 *                                   hint
 * --------------------------------------
 *                  cancelBtn  confirmBtn
 */
import React, { FunctionComponent } from 'react';

// Components
import { Modal, Button } from 'antd';
import Text from '../../shared/text';

// Interfaces
import { ModalProps } from 'antd';
import { Quest } from '../../../types';
import { FunctionalColor } from '../../../utils/colors';

import { funcColorMap } from '../../../utils/colors';

import './confirmModal.scss';
import { FormattedDate } from 'react-intl';

//* Confirm Modal presets
export type ActionType = 'delete' | 'pause' | 'continue';
interface PresetProps {
    color: FunctionalColor;
    actionMsgId: string;
    titleId: string;
    hintId: string;
    questInfoProp: 'createdTime' | 'deployedTime' | 'lastPausedTime' | 'endedTime';
    cancelBtnTextId: string;
    okBtnTextId: string;
}
let cfmDialogPropPresets: Record<ActionType, PresetProps> = null;

export interface ConfirmModalProps extends Omit<ModalProps, 'title' | 'footer'> {
    quest: Partial<Quest>;
    preset: ActionType;
    okBtnLoading?: boolean;
}

const ConfirmModal: FunctionComponent<ConfirmModalProps> = (props) => {
    const { className, onOk, onCancel, preset, quest, okBtnLoading, ...otherProps } = props;
    const { actionMsgId, hintId, cancelBtnTextId, okBtnTextId, color, titleId, questInfoProp } = cfmDialogPropPresets[preset];

    const mappedColor = color ? funcColorMap[color] : null;

    return (
        <Modal {...otherProps} wrapClassName={`cfm-modal ${className ? className : ''}`}
            title={<Text id={titleId} className='cfm-modal--title' style={{ color: mappedColor }} />}
            footer={<>
                <Button className='cfm-modal--cancelBtn' onClick={onCancel}>
                    <Text id={cancelBtnTextId} />
                </Button>
                <Button className='cfm-modal--okBtn' onClick={onOk} loading={okBtnLoading} style={{ backgroundColor: mappedColor }}>
                    <Text id={okBtnTextId} />
                </Button>
            </>}
            className={`cfm-modal ${className}`}>
            <div className='cfm--modal--container'>
                <Text id={actionMsgId} className='cfm-modal--action-text' />
                <span className='cfm-modal--quest-title'>{quest.title}</span>
                <Text id={`quest.${questInfoProp}`} className='cfm-modal--info-prop' />
                <span className='cfm-modal--quest-info'>
                    <FormattedDate value={quest[questInfoProp]}
                        year='numeric' month='short' day='numeric' hour='2-digit' minute='2-digit'
                    />
                </span>
            </div>
            <Text id={hintId} className='cfm-modal--hint' style={{ color: mappedColor }} />
        </Modal>
    );
};

export default ConfirmModal;


//* Generate Confirm Modal props presets
([{ action: 'delete', color: 'error' },
{ action: 'pause', color: 'warn' },
{ action: 'continue', color: 'warn' }
] as { action: ActionType, color: PresetProps['color'] }[])
    .forEach(({ color, action }) => {
        const preset = {
            color,
            actionMsgId: `questCard.cfmDialog.${action}.actionMsg`,
            titleId: `questCard.cfmDialog.${action}.title`,
            hintId: `questCard.cfmDialog.${action}.hint`,
            questInfoProp: action === 'delete' ? 'createdTime' : (action === 'pause' ? 'deployedTime' : 'lastPausedTime'),
            cancelBtnTextId: `questCard.cfmDialog.cancelBtn`,
            okBtnTextId: `questCard.cfmDialog.${action}.okBtn`,
        };
        cfmDialogPropPresets = {
            ...cfmDialogPropPresets,
            [action]: preset
        }
    });