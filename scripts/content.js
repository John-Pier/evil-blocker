console.info('WebSiteEvilBl0cker Init')

const blockSvgUrl = chrome.runtime.getURL('scripts/block.svg');
const yandexSearch = 'https://www.yandex.ru/search';
const isYandexSearch = () => location.href.includes(yandexSearch);
const storageKey = 'locked_sites';

function deleteCallback(link) {
    return async event => {
        event.preventDefault();
        event.stopPropagation();
        if (link?.href) {
            const lockedSitesStore = await chrome.storage.local.get(storageKey);
            lockedSitesStore[storageKey].push(new URL(decodeURIComponent(link?.href)).host);
            await chrome.storage.local.set(lockedSitesStore);
            tick();
        }
    };
}

function createDeleteButton(link) {
    const block = document.createElement('button');
    block.innerHTML = `Удалить нафиг! <svg width="15px" height="15px"><use href="${blockSvgUrl}"></svg>`;
    block.onclick = deleteCallback(link);

    return block;
}

function addDeleteButtons() {
    if(isYandexSearch()) {
        const searchResultEl = document.querySelectorAll('#search-result li');
        searchResultEl?.forEach(resultItem => {
            const link = resultItem.querySelector('a');
            link.after(createDeleteButton(link));
        })
    }
}

async function tick() {
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    findAndRemove(lockedSitesStore[storageKey]);
}

function findAndRemove(lockedSites = []) {
    if (isYandexSearch()) {
        const searchResultEl = document.querySelectorAll('#search-result li');
        searchResultEl?.forEach(resultItem => {
            const link = resultItem.querySelector('a');
            const isBlocked =  link?.href && lockedSites.some(host  =>  {
                return link.href.includes(host);
            })

            if (isBlocked) {
                console.info('Remove', link?.href);
                resultItem.remove();
            }
        })
    }
}

(async function (){
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    if (!lockedSitesStore[storageKey]) {
        await chrome.storage.local.set({[storageKey]: []});
    }
    const lockedSites = lockedSitesStore[storageKey] || [];
    findAndRemove(lockedSites);
    addDeleteButtons();
})();
