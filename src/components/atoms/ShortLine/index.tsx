import React from 'react';

const SYMBOLS_LENGTH = 6;
export const ShortLine = ({title = '', prefix = ''}) => {

    const formatTitle = `
        ${title.substr(0, SYMBOLS_LENGTH) }...${ title.substr(title.length - SYMBOLS_LENGTH, SYMBOLS_LENGTH)}
    `;

    return (
        <span>{prefix} {formatTitle}</span>
    );
};
