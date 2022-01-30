import React, { useState, FunctionComponent, useCallback } from 'react';

// Components
import Plate from '../shared/plate';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import Container from '../shared/container';
import { MenuProps } from 'rc-menu';
import { IconBox, IconDocument, IconEdit, IconFile, IconTelephone } from '../shared/icons';
import Text from '../shared/text';

// Assets
const logoSvg = require('../../assets/logo.svg');

import './navbar.scss';

export interface NavBarProps {
    onMenuSelectChange: (current: MenuItem, before: MenuItem) => void;
    curMenuItem: MenuItem;
    defaultSubmenu?: Submenu;
}

export type Submenu = 'my-quests' | 'quest-lib';
export type MenuItem = 'designer' | 'all' | 'undeployed' | 'deployed' | 'paused' | 'ended' | 'my-sharings' | 'market';
type MenuItemInfo = { key: MenuItem, msgId: string }[];

/**
 * *Keys and intl message id of menu items
 */
const myQuestsMenuItems: MenuItemInfo = [
    { key: 'all', msgId: 'navbar.myQuests.all' },
    { key: 'undeployed', msgId: 'quest.status.undeployed' },
    { key: 'deployed', msgId: 'quest.status.deployed' },
    { key: 'paused', msgId: 'quest.status.paused' },
    { key: 'ended', msgId: 'quest.status.ended' },
];
const questLibMenuItems: MenuItemInfo = [
    { key: 'my-sharings', msgId: 'navbar.questLib.mySharings' },
    { key: 'market', msgId: 'navbar.questLib.market' },
]

const NavBar: FunctionComponent<NavBarProps> = (props) => {
    const [openKey, setOpenKey] = useState<string>(props.defaultSubmenu);

    const { curMenuItem, onMenuSelectChange } = props;

    //* Menu folding and expanding handler
    const handleOpenChange = useCallback((curKeys: string[]) => {
        setOpenKey(curKeys.length ? curKeys[curKeys.length - 1] : null);
    }, [setOpenKey]);

    //* Menu Item selection handler
    const handleMenuSelect = useCallback<MenuProps['onClick']>((event) => {
        if (curMenuItem !== event.key) onMenuSelectChange(event.key as MenuItem, curMenuItem);
    }, [curMenuItem, onMenuSelectChange]);

    return (
        <Plate className='navbar'>
            <Menu className='navbar--menu'
                mode='inline'
                openKeys={[openKey]}
                selectedKeys={[props.curMenuItem]}
                onOpenChange={handleOpenChange}
                onClick={handleMenuSelect}
            >
                {/* Questionnaire Designer */}
                <Menu.Item key='designer' id='menu-item-designer'>
                    <Text className='navbar--menu--submenu'
                        icon={<IconEdit className='navbar--menu--submenu--icon' />}
                        id='navbar.designer'
                        textClass='navbar--menu--submenu--text'
                    />
                </Menu.Item>
                {/* Submenu - My Questionnaires */}
                <SubMenu key='my-quests'
                    title={<Text className='navbar--menu--submenu'
                        icon={<IconFile className='navbar--menu--submenu--icon' />}
                        id='navbar.myQuests'
                        textClass='navbar--menu--submenu--text' />}
                >{myQuestsMenuItems.map((elem) => (
                    <Menu.Item className='navbar--menu--menu-item' key={elem.key}>
                        <Text id={elem.msgId} className='navbar--menu--menu-item--text' />
                    </Menu.Item>))}
                </SubMenu>
                {/* Submenu - Questionnaire Library */}
                <SubMenu key='quest-lib'
                    title={<Text className='navbar--menu--submenu'
                        icon={<IconBox className='navbar--menu--submenu--icon' />}
                        id='navbar.questLib'
                        textClass='navbar--menu--submenu--text'
                    />}>{questLibMenuItems.map((elem) => (
                        <Menu.Item className='navbar--menu--menu-item' key={elem.key}>
                            <Text id={elem.msgId} className='navbar--menu--menu-item--text' />
                        </Menu.Item>))}
                </SubMenu>
            </Menu>
            <Container justify='end' className='navbar--bottom'>
                <img src={logoSvg} className='navbar--bottom--logo' />
                <Text className='navbar--bottom--info'
                    icon={<IconDocument className='navbar--bottom--info--icon' />}
                    id='navbar.document'
                    textClass='navbar--bottom--info--text'
                />
                <Text className='navbar--bottom--info'
                    icon={<IconTelephone className='navbar--bottom--info--icon' />}
                    id='navbar.contact'
                    textClass='navbar--bottom--info--text'
                />
            </Container>
        </Plate>
    );
};

export default NavBar;