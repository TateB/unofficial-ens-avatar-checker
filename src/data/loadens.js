import ENS, { getEnsAddress, labelhash, namehash } from "@ensdomains/ensjs";
import { Contract, providers } from "ethers";
import { CID } from "multiformats/cid";

const provider = new providers.StaticJsonRpcProvider(
  "https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY,
  "mainnet"
);
const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });

export async function fetchEns(name) {
  const nameArray = () => name.split(".");
  if (nameArray().length < 2) name += ".eth";

  const nameData = await ens.name(name);
  const coinAddr = await nameData.getAddress("ETH");
  const ownerAddr = await nameData.getOwner();
  const ownerPrimary = await ens.getName(coinAddr);
  const avField = await nameData.getText("avatar");
  const hasNFT =
    nameArray()[nameArray().length - 1] === "eth" && nameArray().length === 2; // if last part is eth and not subdomain, then it has an associated ENS NFT
  const tokenID = hasNFT ? labelhash(name.split(".")[0]) : namehash(name); // if it's a 2nd level .eth, then you can just use labelhash, otherwise a namehash is needed

  console.log(tokenID);

  if (!ownerAddr) throw new Error("That ENS name is not registered.");
  if (!coinAddr) throw new Error("That ENS name isn't set as a primary name.");
  if (ownerPrimary.name !== nameData.name)
    throw new Error(
      "That ENS name isn't set as the primary name of the owner's wallet."
    );

  return { tokenID, address: coinAddr, avField, hasNFT, formattedName: name };
}

export async function fetchMetadata(tokenID, avField, hasNFT) {
  try {
    const fetchedData = await fetch(
      "https://metadata.ens.domains/mainnet/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/" +
        tokenID
    ).then((res) => res.json());
    fetchedData.tokenID = tokenID;
    fetchedData.avField = avField;
    fetchedData.hasNFT = hasNFT;
    console.log(fetchedData);
    return fetchedData;
  } catch (error) {
    return new Error(error.message);
  }
}

export async function validateNewInput(uri) {
  const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
  const IPNS_GATEWAY = "https://ipfs.io/ipns/";

  if (uri.startsWith("data:") || uri.startsWith("http")) {
    return uri;
  } else if (uri.startsWith("ipfs://ipfs/")) {
    return uri.replace("ipfs://ipfs/", IPFS_GATEWAY);
  } else if (uri.startsWith("ipfs://ipns/")) {
    return uri.replace("ipfs://ipns/", IPNS_GATEWAY);
  } else if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", IPFS_GATEWAY);
  } else if (uri.startsWith("/ipfs/")) {
    return uri.replace("/ipfs/", IPFS_GATEWAY);
  } else if (uri.startsWith("ipfs/")) {
    return uri.replace("ipfs/", IPFS_GATEWAY);
  } else if (isCID(uri)) {
    // Assume that it's a regular IPFS CID and not an IPNS key
    return IPFS_GATEWAY + uri;
  } else if (uri.startsWith("ipns://ipns/")) {
    return uri.replace("ipns://ipns/", IPNS_GATEWAY);
  } else if (uri.startsWith("ipns://")) {
    return uri.replace("ipns://", IPNS_GATEWAY);
  } else if (uri.startsWith("/ipns/")) {
    return uri.replace("/ipns/", IPNS_GATEWAY);
  } else if (uri.startsWith("ipns/")) {
    return uri.replace("ipns/", IPNS_GATEWAY);
  } else {
    // we may want to throw error here
    return false;
  }

  function isCID(hash) {
    try {
      if (typeof hash === "string") {
        return Boolean(CID.parse(hash));
      }
      return Boolean(CID.asCID(hash));
    } catch (e) {
      return false;
    }
  }
}

export async function checkNFTMetadata(nft) {
  const { address, schema_name } = nft.asset_contract;
  const ABI = [];
  if (schema_name === "ERC721")
    ABI.push(
      "function tokenURI(uint256 tokenId) external view returns (string memory)"
    );
  if (schema_name === "ERC1155")
    ABI.push(
      "function uri(uint256) public view virtual override returns (string memory)"
    );
  if (ABI.length === 0)
    throw new Error(
      "This NFT doesn't follow an ERC schema, and isn't currently compatible with ENS avatars."
    );
  const contract = new Contract(address, ABI, provider);

  try {
    await Object.values(contract.functions)[0](nft.token_id).then(
      (res) => res[0]
    );
    return nft;
  } catch (err) {
    throw new Error(
      "This NFT doesn't have a metadata endpoint, and isn't currently compatible with ENS avatars."
    );
  }
}
