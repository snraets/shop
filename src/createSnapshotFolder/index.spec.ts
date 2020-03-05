import {folder} from './index';

it.skip('creates the folder', () => {
    return folder('test').then(res => console.log(res));;
});

it('folder was already created', () => {
    return folder('test').then(res => console.log(res));
});