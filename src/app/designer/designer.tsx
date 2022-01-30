import React, { useState, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export interface DesignerProps {

}

const Designer: FunctionComponent<DesignerProps> = (props) => {

    return (
        <div>
            🤣别看了，设计好了还没做呢🤣
            <Link to='/'>Back</Link>
        </div>
    );
};

export default Designer;