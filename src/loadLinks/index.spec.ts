import {links} from './index';

it('gets the links', () => {
    return links().then(links => console.log(links.length));
})