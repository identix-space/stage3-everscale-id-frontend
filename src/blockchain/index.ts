import {libWeb, libWebSetup} from '@tonclient/lib-web';
import {TonClient} from '@tonclient/core';
import {DIDRegistry} from 'everscaleidsdk/build/src/DIDRegistry';

const DID_REGISTRY_ADDRESS = '0:7fff4d198fdb141f09ea4e43f1e1d387be86a76e09b99536ba71aeddcf3ea7a9';

libWebSetup({
    binaryURL: '/tonclient.wasm'
});
TonClient.useBinaryLibrary(libWeb as any);


export const didRegistry = new DIDRegistry({
    tonBinary: libWeb as any,
    didRegistryAddress: DID_REGISTRY_ADDRESS,
    everscaleApiUrls: ['main.ton.dev']
});
