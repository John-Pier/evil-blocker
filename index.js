const storageKey = 'locked_sites';

const list = document.querySelector('#site-list');
const currentSiteTemplate = document.querySelector('#lock-current-template');
const currentSiteSection = document.querySelector('#lock-current-section');

const createLi = (text) => {
    const li = document.createElement('li');
    li.innerHTML = text;
    return li;
};

async function clearStorage() {
    await chrome.storage.local.remove(storageKey);
    list.innerHTML = '';
}

async function setupList() {
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    const lockedSites = lockedSitesStore[storageKey] || [];

    lockedSites?.forEach(site => {
        list.insertAdjacentElement('afterbegin', createLi(site));
    })
}

async function addNewLockedSite(host) {
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    lockedSitesStore[storageKey].push(host);
    await chrome.storage.local.set(lockedSitesStore);
}

async function setLockCurrentSiteView() {
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    const lockedSites = lockedSitesStore[storageKey] || [];

    // const tab =  await chrome.tabs.getCurrent();
    // console.log(chrome.runtime)

    // const currentHost = new URL( tab.url).host;
    // if (!lockedSites.includes(currentHost)) {
    //     const node = currentSiteTemplate.content.cloneNode(true);
    //     currentSiteSection.append(node);
    //     document.querySelector('#lock-current-btn')?.addEventListener('click', () => {
    //         addNewLockedSite(currentHost);
    //         node.remove()
    //     })
    //
    // }
}

setupList();
setLockCurrentSiteView();
document.querySelector('#delete-all')?.addEventListener('click', clearStorage);



