import * as puppeteer from 'puppeteer';
import random from 'random-int';
import {of} from 'rxjs';

import {Link} from '../loadLinks';

export const path = (link: Link) => `./snapshots/${link.domain}/${link.PDF.toString()}.png`

export const waitUntil = (domain) => {
    switch (domain) {
        case 'bestbuy':
            return 'domcontentloaded';
        case 'crateandbarrel':
            return 'domcontentloaded';
        case 'harborfreight':
            return 'networkidle0';
        case 'worldmarket':
            return 'networkidle2';
        default:
            return 'networkidle0';
    }
}

export const Page = (browser: puppeteer.Browser) => {
    return async (link: Link) => {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
        await page.setDefaultNavigationTimeout(0); 
        await page.goto(link.Link, {waitUntil: waitUntil(link.domain)}); // 'networkidle0'

        if (link.domain === 'gap' || link.domain === 'oldnavy.gap') {
            await page.waitFor(1000);
            await page.mouse.click(0, 0);
            await page.waitFor(1000);            
        } else if (link.domain === 'harborfreight') {
            await page.waitFor(1000);
            await page.mouse.click(0, 0);
            await page.waitFor(1000);   
            await page.mouse.click(0, 0); 
            await page.waitFor(1000);         
        } else if (link.domain === 'officedepot') {
            await page.waitFor(2000);
            await page.mouse.click(0, 0);
            await page.waitFor(1000);   
            await page.mouse.click(0, 0); 
            await page.waitFor(1000);              
        } else {
            await page.waitFor(1000);
            await page.mouse.click(0, 0);
            //await page.waitFor(10000);
        }

        await page.screenshot({path: path(link)});  // , fullPage: true
        await page.mouse.move(random(20, 250), random(20, 250));
        await page.mouse.move(random(20, 250), random(20, 250));
        await page.mouse.click(random(0, 25), random(0, 25));
        await page.close();
        return of(link)
    };
}