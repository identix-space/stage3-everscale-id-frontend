import React from 'react';
import {history} from '../../../../routing';
import {Card, ShortLine} from '../../../../components';
import {Button, LoginContainer, Row, Col, Title2Bold, Body1, Body1Bold, Body2, Body4} from '../../../../ui';
import styled from 'styled-components';
import {COLORS, DID_URL_PREFIX} from '../../../../utils/static';


export const LoginPageView = ({handleLogin, accountDid, changeAccount, error, refetchDid, publicKey}) => {


    const onLogin = () => {
        handleLogin();
    };
    const onCreateDid = () => {
        history.push('/why-everscale-info');
    };

    if (!error) {
        return (
            <LoginContainer>
                <Col maxWidth={'372px'} justifyContent={'center'} gap={'15'}>
                    <Title2Bold color={'#FFFFFF'} textAlign={'center'} marginBottom={'15'}>
                        {accountDid ? 'Selected DID' : 'Selected account'}
                    </Title2Bold>

                    <Card textAlign={'center'} minWidth={372} padding={'0'}>
                        <Row padding={'20'} alignItems={'center'} borderBottom={'1'}>
                            <AvatarIcon src={`https://avatars.dicebear.com/api/bottts/${accountDid}.svg`}/>
                            <Body2 textAlign={'left'}>
                                Public key:<br/>
                                <ShortLine
                                    title={publicKey}
                                />
                            </Body2>
                        </Row>
                        <DidContainer>
                            {accountDid && <Body1 color={'rgba(53, 52, 56, 0.8)'} marginBottom={3}>
                                <ShortLine
                                    prefix={DID_URL_PREFIX}
                                    title={accountDid}
                                />
                            </Body1>}
                            {!accountDid && <Body1>You have no DID associated<br/> with this public key.</Body1>}
                        </DidContainer>
                        {accountDid
                            ? <Button
                                label={'Log In'}
                                onClick={onLogin}
                                topCorners
                                wide
                            />
                            : <Button
                                label={'Create DID'}
                                onClick={onCreateDid}
                                TextStyle={Body1Bold}
                                topCorners
                                wide
                            />}
                    </Card>

                    <TextWithLines>or</TextWithLines>
                    <BlackBtn
                        label={'Change account'}
                        onClick={changeAccount}
                        wide
                    />
                </Col>
            </LoginContainer>
        );
    }

    return (
        <LoginContainer >
            <Col maxWidth={'450px'} gap={15}>
                <Card maxWidth={450}>
                    <Body1 color={'#f30369'} marginBottom={30}>
                        {errors[error]}
                    </Body1>

                    <Button
                        label={'Try again'}
                        onClick={refetchDid}
                        wide
                    />

                </Card>
                <TextWithLines>or</TextWithLines>
                <BlackBtn
                    label={'Change account'}
                    onClick={changeAccount}
                    wide
                />
            </Col>

        </LoginContainer>

    );
};

const errors = {
    accountNotFound: `Sorry, we couldn't find your account
     in Everscale, please initialize the account (top up
      balance and deploy wallet) at first and try again.`
};


const AvatarIcon = styled.img`
    width: 62px;
    height: 62px;
    margin-right: 15px;
    border-radius: 8px;
`;
const BlackBtn = styled(Button)`
    background-color: ${COLORS.defaultText};
`;
const TextWithLines = styled(Body4)`
    overflow: hidden;
    text-align: center;
    color: #FFFFFF;
    width: 100%;
    opacity: 0.5;
    font-size: 15px;
    
    &:before,
    &:after {
      background-color: #FFFFFF;
      content: "";
      display: inline-block;
      height: 1px;
      position: relative;
      vertical-align: middle;
      width: 43%;
    }
    
    &:before {
      right: 7%;
      margin-left: -50%;
    }
    
    &:after {
      left: 7%;
      margin-right: -50%;
    }
`;
const DidContainer = styled.div`
  padding: 18px 20px 14px 20px;
`;
