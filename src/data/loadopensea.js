export async function loadAllNFTs(address) {
  var page = 0;
  const pages = [];
  console.log(address);
  do {
    pages.push(await loadPage(address, page));
    page += 1;
  } while (pages[pages.length - 1].assets.length === 50);
  return pages
    .reduce((acc, page) => acc.concat(page.assets), [])
    .filter(
      (asset) =>
        asset.asset_contract.address !==
        "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
    );
}

async function loadPage(address, page) {
  return fetch(
    `https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=${
      page * 50
    }&limit=50`
  ).then((res) => res.json());
}
