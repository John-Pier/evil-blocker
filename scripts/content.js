console.info('WebSite L0cker Init')

const blockSvgUrl = chrome.runtime.getURL('/block.svg')


if (window.location.href.includes('https://www.yandex.ru/search')) {
    console.log('Yandex ±!');
    const searchResultEl = document.querySelectorAll('#search-result li');

    console.log(searchResultEl);

    searchResultEl?.forEach(resultItem => {
        const link = resultItem.querySelector('a');
        if (link?.href.includes('ivi.ru')) {
            console.log('Remove', link?.href);
            resultItem.remove();
        }

        const block = document.createElement('svg');
        block.innerHTML = `<use href="${blockSvgUrl}">`

        link.insertAdjacentElement('afterbegin', block)
    })

}
