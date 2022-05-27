import React from 'react';
import {WhyEverscaleCard} from '../../../components';
import {FixedModalWrapper} from '../components';


export const WhyEverscaleModal = ({onClose = null}) => {

    return (
        <FixedModalWrapper onClose={onClose} top={'30%'} >
            <WhyEverscaleCard
                onClick={onClose}
            />
        </FixedModalWrapper>
    );
};

