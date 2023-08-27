const storageKey = 'locked_sites';

const list = document.querySelector('#site-list');
const createLi = (text) => {
    const li = document.createElement('li');
    li.innerHTML = text;
    return li;
};

document.querySelector('#delete-all')?.addEventListener('click', async () => {
    await chrome.storage.local.remove(storageKey);
    list.innerHTML = '';
});

(async function () {
    const lockedSitesStore = await chrome.storage.local.get(storageKey);
    const lockedSites = lockedSitesStore[storageKey] || [];

    lockedSites?.forEach(site => {
        list.insertAdjacentElement('afterbegin', createLi(site));
    })
}) ()

