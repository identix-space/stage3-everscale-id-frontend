import React from 'react';
import {Row} from '../../../ui/layout';
import styled from 'styled-components';
import TelegramIcon from '../../../assets/img/telegram-ic.svg';
import GitlabIcon from '../../../assets/img/gitlab-ic.svg';
import DocsIcon from '../../../assets/img/readthedocs-ic.svg';
import {COLORS} from '../../../utils/static/colors';


export const Footer = () => {

    return (
        <StyledRow justifyContent={'center'}>
            <Link href={'https://t.me/avarab'} target={'_blank'}>
                <Icon src={TelegramIcon}/>
            </Link>
            <Link href={'https://gitlab.com/everscale-id'} target={'_blank'}>
                <Icon src={GitlabIcon}/>
            </Link>
            <Link
                href={'https://jealous-shroud-6ff.notion.site/Everscale-Self-Sovereign-Identity-Framework-Stage-3-079e61c4d86348b8b5c0cae163036798'}
                target={'_blank'}
            >
                <Icon src={DocsIcon}/>
            </Link>
        </StyledRow>
    );
};


const StyledRow = styled(Row)`
    height: 64px;
    padding-top: 14px;
`;
const Link = styled.a`
    padding: 0 8px;
    cursor: pointer;
    height: 24px;
`;
const Icon = styled.img`
    width: 24px;
    height: 24px;
    fill: ${COLORS.white};
`;
