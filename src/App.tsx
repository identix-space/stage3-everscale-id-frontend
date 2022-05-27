import React, {useEffect} from 'react';
import {useWhoAmIQuery} from './generated/graphql';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store/root-reducer';
import {didStorage, history, LoginRouter, MainRouter, ScrollToTop} from './routing';
import {userActions} from './store/user';
import {AppWrapper, Header, Footer, Loader, Toast} from './components';
import {loaderActions} from './store/loader';

let token = localStorage.getItem('token');
export const App = () => {
    const dispatch = useDispatch();
    const {loader, user} = useSelector((state: RootState) => state);
    const {refetch} = useWhoAmIQuery();

    useEffect(() => {
        (async () => {
            try {
                await didStorage.initInpageProvider();
            } catch (err) {
                console.warn('Init inpage provider err', err.message);
            } finally {
                dispatch(loaderActions.hideLoader());
            }
        })();
    }, []);


    useEffect(() => {
        (async () => {
            if (token) {
                try {
                    const resWhoAmI = await refetch();
                    dispatch(userActions.setUser(resWhoAmI?.data.whoami));
                } catch (e) {
                    console.error('FETCH_USER_BY_TOKEN', e);
                    token = null;
                    history.push('/login');
                }
            }
        })();
    }, []);

    return (
        <ScrollToTop>
            <AppWrapper>
                <Header/>

                {!loader.visible && !token && !user.user && <LoginRouter/>}
                {!loader.visible && user.user && <MainRouter/>}
                {loader.visible && <Loader label={loader.label}/>}

                <Toast/>
            </AppWrapper>
        </ScrollToTop>
    );
};
