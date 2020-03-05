import {getDomain} from './index';

it('gets the domain', () => {

    const domain = getDomain('https://abt.com/product/138917/Apple-Watch-Series-5-GPS-44mm-Space-Gray-Aluminum-Case-With-Black-Sport-Band-MWVF2LLA.html');

    expect(domain).toBe('abt')

});