import csv from 'csvtojson';

const src = 'links.csv';

export interface Link {
    PDF: number;
    Link: string;
    domain?: string;
}

export const links = async (): Promise<Link[]> => {

    try {
        return await csv()
            .fromFile(src)
            .then(links => links.map( item => ({...item, PDF: parseInt(item.PDF)}) ))
    } catch (error) {
        
    }

};