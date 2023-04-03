import React from 'react';
import classNames from 'classnames';
import { icons } from './FileTypeIcons';

function getFileIcon(fileType) {
    const icon = icons[fileType] || icons['default'];
    const className = classNames('me-2', 'align-content-center');

    return React.createElement(icon, { size: 35, className: className });
}

export default getFileIcon;
