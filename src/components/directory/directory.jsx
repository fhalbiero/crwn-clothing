import React from 'react';
import { connect } from 'react-redux';

import MenuItem from '../menu-item/menu-item';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';

import { Container } from './styles';

const Directory = ({sections}) => (
    <Container>
        {sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem  key={id} {...otherSectionProps} />
        ))} 
    </Container>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);