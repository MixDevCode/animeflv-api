import { Cheerio, type Element } from "cheerio";

export function getNextAndPrevPages(selector: Cheerio<Element>): {
    foundPages: number
    previousPage: string | null
    nextPage: string | null
} {
    const aTagValue = selector.last().prev().find('a').text();
    const aRef = selector.eq(0).children('a').attr('href');

    let foundPages = 0;
    let previousPage: string | null = "";
    let nextPage: string | null = "";

    if (Number(aTagValue) === 0) foundPages = 1;
    else foundPages = Number(aTagValue);

    if (aRef === "#" || foundPages == 1) previousPage = null;
    else previousPage = 'https://www3.animeflv.net' + aRef;

    if (selector.last().children('a').attr('href') === "#" || foundPages == 1) nextPage = null;
    else nextPage = 'https://www3.animeflv.net' + selector.last().children('a').attr('href');

    return { foundPages, nextPage, previousPage }

}