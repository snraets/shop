import puppeteer from 'puppeteer-extra';
// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import {from} from 'rxjs';
import {concatMap, filter, map, mergeMap} from 'rxjs/operators';

import {links, Link} from './loadLinks';
import {getDomain} from './domain';
import {folder} from './createSnapshotFolder';
import {Page} from './newPage';

const filterDomains = filter((link: Link) => {
    return link.domain === 'samsclub'; // kay kohls lowes macys neimanmarcus newegg shop.nordstrom officedepot oldnavy overstock pier1, qvc samsclub sears sephora staples target victoriassecret walmart wayfair
    // return link.domain === 'academy' ||
    //     link.domain === 'abt' || 
    //     link.domain === 'amazon'
    //     link.domain === 'bhphotovideo'
    //     link.domain === 'bananarepublic.gap'
    //     link.domain === 'basspro'
    //     link.domain === 'bathandbodyworks' -- not working
    //     link.domain === 'bedbathandbeyond'
    //     link.domain === 'bestbuy'
    //     link.domain === 'bloomingdales'
    //     link.domain === 'cabelas';
    //     link.domain === 'worldmarket'
    //     link.domain === 'crateandbarrel'
    //     link.domain === 'dickssportinggoods'
    //     link.domain === 'footlocker'
    //     link.domain === 'frys'
    //     link.domain === 'gap'
    //     link.domain === 'harborfreight'
    //      link.domain === 'homedepot'
    //      link.domain === 'jcpenney'
    //      link.domain === 'kay'
    //      link.domain === 'kohls'
    //      link.domain === 'lowes'
    //      link.domain === 'macys'
    //      link.domain === 'neimanmarcus'
    //      link.domain === 'newegg'
    //      link.domain === 'shop.nordstrom'
    //      link.domain === 'officedepot'
    //      link.domain === 'oldnavy.gap'
    //      link.domain === 'overstock'
    //      link.domain === 'pier1'
});

(async () => {    

    puppeteer.use(StealthPlugin());

    const browserOptions = {
        headless: false, 
        timeout: 600000,
        defaultViewport: {
            width:1200, 
            height: 1000
        }
    };

    const browser = await puppeteer.launch(browserOptions);
    const page = Page(browser);

    from(links())
        .pipe(
            mergeMap(links => from(links)),
            map(link => ({...link, domain: getDomain(link.Link)})),            
            filterDomains,
            concatMap(link => from(folder(link.domain)), outerValue => outerValue),
            concatMap( link => page(link), outerValue => outerValue )
        )
        .subscribe(
            res => console.log(res),
            error => {
                console.error(error);
                browser.close();
            },
            () => browser.close()
        );

})();