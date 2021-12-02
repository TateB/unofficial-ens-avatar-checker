import ENS, { getEnsAddress, labelhash, namehash } from "@ensdomains/ensjs";
import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY
);
const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });

export async function fetchEns(name) {
  const nameArray = () => name.split(".");
  if (nameArray().length < 2) name += ".eth";

  const nameData = await ens.name(name);
  const coinAddr = await nameData.getAddress("ETH");
  const ownerAddr = await nameData.getOwner();
  const ownerPrimary = await ens.getName(ownerAddr);
  const avField = await nameData.getText("avatar");
  const hasNFT = nameArray()[nameArray().length - 1] === "eth"; // if last part is eth, then it has an associated ENS NFT
  const tokenID = hasNFT ? labelhash(name.split(".")[0]) : namehash(name); // if it's a 2nd level .eth, then you can just use labelhash, otherwise a namehash is needed

  console.log(ownerPrimary, nameData);

  if (!ownerAddr) throw new Error("That ENS name is not registered.");
  if (!coinAddr) throw new Error("That ENS name isn't set as a primary name.");
  if (ownerPrimary.name !== nameData.name)
    throw new Error(
      "That ENS name isn't set as the primary name of the owner's wallet."
    );

  return { tokenID, address: coinAddr, avField, hasNFT };
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
