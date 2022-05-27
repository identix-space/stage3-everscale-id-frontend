import React from 'react';
import {Card} from '../../../components';
import {Button, LoginContainer, Row, Title2Bold} from '../../../ui';
import ChromeIcon from '../../../assets/img/chrome_extension_ic.svg';
import {EVER_EXTENSION_URL} from '../../../utils/static';

export const ConnectWallet = () => {

    const goChromeStore = () => {
        window.open(EVER_EXTENSION_URL, '_self');
    };

    return (
        <LoginContainer>
            <Card textAlign={'center'}>
                <Row flexDirection={'column'} justifyContent={'space-between'} minHeight={'348'}>
                    <Title2Bold marginBottom={'60'}>
                        Please, install EVER<br/>Crystal Wallet
                    </Title2Bold>

                    <img src={ChromeIcon}/>
                    <Button
                        label={'Go Chrome store'}
                        onClick={goChromeStore}
                        marginTop={'52'}
                        wide
                    />
                </Row>
            </Card>
        </LoginContainer>
    );
};
