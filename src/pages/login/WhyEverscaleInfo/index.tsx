import React from 'react';
import {libWeb} from '@tonclient/lib-web';
import {DIDDocument} from 'everscaleidsdk/build/src/DIDDocument';
import {useDispatch} from 'react-redux';
import {didStorage, history} from '../../../routing';
import {loaderActions, modsActions} from '../../../store';
import {WhyEverscaleCard} from '../../../components';
import {LoginContainer} from '../../../ui';
import {apolloClient} from '../../../utils/ApolloClient';
import {didToFront} from '../../../utils/helpers';
import {createDidDocument} from '../../../graphql/mutations';


export const WhyEverscalePage = () => {
    const dispatch = useDispatch();

    const createDid = async () => {
        dispatch(loaderActions.showLoader());

        try {
            const {data} = await apolloClient.mutate({
                mutation: createDidDocument,
                variables: {ownerPublicKey: `0x${didStorage.currentAccountPublicKey}`}
            });

            if (data && data.createDidDocument) {
                waitingBlockchainDelay(data.createDidDocument);
            }
        } catch (e) {
            dispatch(loaderActions.hideLoader());
            console.error('createDid', e);
        }
    };

    const timeoutPing = 1500;
    const waitingBlockchainDelay = (did) => {

        const didDoc = new DIDDocument({
            tonBinary: libWeb as any,
            didDocumentAddress: did,
            everscaleApiUrls: ['main.ton.dev']
        });

        let timerId = setTimeout(async function tick() {
            try {
                const didDocContent = await didDoc.getContent();

                if (!didDocContent) {
                    timerId = setTimeout(tick, timeoutPing);
                } else {
                    dispatch(modsActions.setLightBgMode());
                    dispatch(loaderActions.hideLoader());
                    history.push('/create-did', didToFront(did));
                }
            } catch (e) {
                waitingBlockchainDelay(did);
                console.log('waitingBlockchainDelay error', e);
            }
        }, timeoutPing);
    };

    return (
        <LoginContainer>
            <WhyEverscaleCard
                onClick={createDid}
            />
        </LoginContainer>
    );
};
