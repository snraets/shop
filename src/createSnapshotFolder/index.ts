import * as fs from 'fs';
import { promises } from 'dns';

const root = 'snapshots';

export const folder = async (name: string) => {
    
    try {
        if (!fs.existsSync(`./${root}/${name}`)) 
            return fs.promises.mkdir(`./${root}/${name}`).then(() => 'folder was created');
        
        return Promise.resolve('snapshot folder exists');
     
    } catch (error) {
        throw(error);
    }
}