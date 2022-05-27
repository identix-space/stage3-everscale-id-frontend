import React, {useEffect, useState} from 'react';
import {didStorage, history} from '../../../../routing';
import {ShortLine} from '../../../..//components';
import {
    Row,
    Col,
    OverpassBody2Bold,
    Overpass14Bold, Overpass11, Body3, Roboto12
} from '../../../../ui';
import {COLORS} from '../../../../utils/static';
import styled from 'styled-components';


export const HeaderView = ({user, onLogout, changeAccount}) => {
    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        const listener = (e) => {
            try {
                if (menuActive && !e.target.closest('[data-menu]')) {
                    setMenuActive(false);
                }
            } catch (err) {
                console.error(err);
            }

        };
        document.body.addEventListener('click', listener);

        return () => document.body.removeEventListener('click', listener);
    }, [menuActive]);


    return (
        <HeaderContainer>
            <OverpassBody2Bold
                color={COLORS.white}
                onClick={() => history.push('/home')}
            >
                EVERSCALE.id
            </OverpassBody2Bold>

            {user && <ProfileMenuWrapper active={menuActive} data-menu>
                <ProfileMainRow gap={8} alignCenter nowrap onClick={() => setMenuActive(!menuActive)}>
                    <Avatar src={`https://avatars.dicebear.com/api/bottts/${user.did}.svg`}/>
                    <Col maxWidth={'152px'}>
                        <DidTitle color={menuActive ? '#D7DDE8' : '#C4C4C4'}>did-{user.did}</DidTitle>
                        <Overpass11 color={'#FF95EC'} marginTop={2}>
                            Public key: <ShortLine title={didStorage.currentAccountPublicKey}/>
                        </Overpass11>
                    </Col>
                </ProfileMainRow>

                {menuActive && <ProfileInner>
                    <ChangeAccountContainer>
                        <Body3 color={COLORS.white}>Change DID</Body3>
                        <Roboto12 color={COLORS.white} marginTop={5}>
                            Do you really want to change DID? You will be redirected to the authorization page
                        </Roboto12>

                        <ChangeAccountButton onClick={changeAccount}>
                            <Body3 color={'#0C0C0C'}>
                                Change account
                            </Body3>
                        </ChangeAccountButton>
                    </ChangeAccountContainer>

                    <LogoutButton onClick={onLogout}>
                        <Body3 color={COLORS.white}>
                            Log out
                        </Body3>
                    </LogoutButton>
                </ProfileInner>}
            </ProfileMenuWrapper>}
        </HeaderContainer>
    );
};


const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 63px;
    position: sticky;
    top: 0;
    width: 100%;
    height: 64px;
    padding: 0 24px 0 32px;
    background: rgba(105, 109, 228, 0.2);
    box-shadow: inset 0px 64px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.15);
    z-index: 50;
`;
const ProfileMenuWrapper = styled.div`
    position: relative;
    width: 213px;
    background: ${p => p.active ? 'rgba(33, 30, 41, 0.7)' : 'rgba(33, 30, 41, 0.4)'};
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
    border-radius: ${p => p.active ? '8px 8px 0 0' : '8px'};
`;
const ProfileMainRow = styled(Row)`
    height: 48px;
    padding: 0 8px;
    overflow: hidden;
    cursor: pointer;
`;
const DidTitle = styled(Overpass14Bold)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Avatar = styled.img`
    height: 32px;
    width: 32px;
    border-radius: 4px;
    transform: scale(1.15);
`;
const ProfileInner = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background: rgba(33, 30, 41, 0.7);
  border-radius: 0 0 8px 8px;
  
  :before {
    content: '';
    display: block;
    height: 1px;
    margin: 0 8px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
const ChangeAccountContainer = styled.div`
  padding: 19px 22px 14px 22px;
`;
const ChangeAccountButton = styled.button`
  margin-top: 15px;
  min-height: 39px;
  width: 100%;
  background: #FF62E3;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
const LogoutButton = styled.button`
  display: block;
  min-height: 39px;
  width: 100%;
  background: rgba(33, 30, 41, 0.7);
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
`;
