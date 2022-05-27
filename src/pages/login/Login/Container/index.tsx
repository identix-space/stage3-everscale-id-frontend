import React, {useEffect, useState} from 'react';
import {didRegistry} from '../../../../blockchain';
import {useDispatch} from 'react-redux';
import {loaderActions} from '../../../../store/loader';
import {didStorage, history} from '../../../../routing';
import {userActions} from '../../../../store';
import {useLoginGenerateMutation, useLoginVerifyMutation} from '../../../../generated/graphql';
import {LoginPageView} from '../View';
import {Loader} from '../../../../components';
import {Buffer} from 'buffer';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const [loginGenerate] = useLoginGenerateMutation();
    const [loginVerify] = useLoginVerifyMutation();
    const [accountDid, setAccountDid] = useState(null);
    const [publicKey, setPublicKey] = useState(didStorage.currentAccountPublicKey);
    const [fetchingDid, setFetchingDid] = useState(true);
    const [accountDidError, setAccountDidError] = useState('');

    useEffect(() => {
        loadDid();
    }, []);

    const loadDid = async () => {
        try {
            const res = await didRegistry.getDidDocuments({
                eitherDocOwnerPubKey: `0x${didStorage.currentAccountPublicKey}`
            });
            console.log({res});
            if (res) {
                setAccountDid(res[0]);
            }
        } catch (e) {
            console.log('loadDIDDocumentsError', e);

            if (e.message === 'runLocal: Account not found') {
                setAccountDidError('accountNotFound');
            }
        } finally {
            setFetchingDid(false);
        }
    };


    //ToDo: divide logic
    const handleLogin = async () => {
        dispatch(loaderActions.showLoader());

        try {
            const resGenerate = await loginGenerate({variables: {did: accountDid}});

            const singedData = await didStorage.signData(Buffer.from(resGenerate.data.loginGenerate).toString('base64'));

            const resVerify = await loginVerify({
                variables: {
                    did: accountDid,
                    signedMessage: singedData.signatureHex
                }
            });
            const {loginVerify: loginVerifyRes} = resVerify.data;

            //setUser
            dispatch(userActions.setUser(loginVerifyRes.account));
            localStorage.setItem('token', loginVerifyRes.token);

            //finish
            history.push('/home');
        } catch (err) {
            console.warn('Login generate err:', err);
        } finally {
            dispatch(loaderActions.hideLoader());
        }
    };

    const changeAccount = async () => {
        await didStorage.initInpageProvider(true);
        setPublicKey(didStorage.currentAccountPublicKey);
        await loadDid();
    };

    const refetchDid = async () => {
        setAccountDidError('');
        setFetchingDid(true);
        await loadDid();
    };

    if (!fetchingDid) {
        return (
            <LoginPageView
                handleLogin={handleLogin}
                accountDid={accountDid}
                error={accountDidError}
                refetchDid={refetchDid}
                changeAccount={changeAccount}
                publicKey={publicKey}
            />
        );
    } else {
        return (
            <Loader label={'Checking for presence...'}/>
        );
    }
};
