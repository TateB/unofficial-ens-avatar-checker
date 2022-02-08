export async function loadAllNFTs(address) {
  const pages = [];
  console.log(address);
  do {
    pages.push(
      await loadPage(
        address,
        pages.length > 0 && pages[pages.length - 1].continuation
      )
    );
    console.log(pages);
  } while (pages[pages.length - 1].nfts.length === 50);
  return pages
    .reduce((acc, page) => acc.concat(page.nfts), [])
    .filter(
      (nft) =>
        nft.contract_address !== "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" &&
        nft.cached_file_url
    );
}

const baseURL = "https://api.nftport.xyz/v0";

async function loadPage(address, continuation_string) {
  return fetch(
    `${baseURL}/accounts/${address}?chain=ethereum&include=metadata${
      continuation_string ? `&continuation=${continuation_string}` : ""
    }`,
    {
      headers: {
        Authorization: process.env.REACT_APP_NFTPORT_KEY,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}

export async function loadNFTDetail(address, tokenId) {
  return fetch(`${baseURL}/nfts/${address}/${tokenId}?chain=ethereum`, {
    headers: {
      Authorization: process.env.REACT_APP_NFTPORT_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => ({
      contractSchema: res.contract.type,
      address: res.nft.contract_address,
      tokenId: res.nft.token_id,
    }));
}
