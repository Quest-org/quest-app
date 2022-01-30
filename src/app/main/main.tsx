import React, { useState, FunctionComponent, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Components
import NavBar, { MenuItem } from './navbar';
import Space from '../shared/space';
import Container from '../shared/container';

import './main.scss';

const Main: FunctionComponent = () => {
    const [curMenuItem, setCurMenuItem] = useState<MenuItem>('all');
    const navigate = useNavigate();

    const handleMenuSelectChange = useCallback((current: MenuItem) => {
        if (current === 'all') navigate('/');
        else navigate(current);

        //* Make sure that menu item 'designer' won't be selected
        if (current !== 'designer') setCurMenuItem(current);
    }, [setCurMenuItem, navigate]);

    return (
        <Container justify='start' className='main'>
            <NavBar
                defaultSubmenu='my-quests'
                curMenuItem={curMenuItem}
                onMenuSelectChange={handleMenuSelectChange}
            />
            <Space height="100%" width="15px" />
            <Outlet />
        </Container>
    );
};

export default Main;