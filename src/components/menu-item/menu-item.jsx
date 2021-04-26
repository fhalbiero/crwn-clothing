import React from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from './styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <Container 
        size={size} 
        onClick={() => history.push(`${match.url}${linkUrl}`)}
    >        
        <div 
            className="background-image"
            style={{
                backgroundImage : `url(${imageUrl})`
            }}></div>
        <div className="content">
            <h1 className="title">{ title }</h1>
            <span className="subtitle">SHOP-NOW</span>
        </div>

    </Container>
);

export default withRouter(MenuItem);