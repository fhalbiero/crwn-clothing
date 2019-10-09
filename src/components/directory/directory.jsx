import React from 'react';
import { connect } from 'react-redux';

import './directory.scss';

import MenuItem from '../menu-item/menu-item';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';

const Directory = ({sections}) => (
    <div className="directory-menu">
        {sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem  key={id} {...otherSectionProps} />
        ))} 
    </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);