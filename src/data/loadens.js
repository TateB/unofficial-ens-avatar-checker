import ENS, { getEnsAddress, labelhash } from "@ensdomains/ensjs";
import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY
);
const ens = new ENS({ provider, ensAddress: getEnsAddress("1") });

export async function fetchEns(name) {
  if (name.split(".").length < 2) name += ".eth";
  if (name.split(".").length > 2)
    throw new Error("Subdomains are not supported yet.");
  const nameData = await ens.name(name);
  const coinAddr = await nameData.getAddress("ETH");
  const ownerAddr = await nameData.getOwner();
  const avField = await nameData.getText("avatar");
  const tokenID = labelhash(name.split(".")[0]);

  if (!ownerAddr) throw new Error("That ENS name is not registered.");
  if (!coinAddr) throw new Error("That ENS name isn't set as a primary name.");

  return { tokenID, address: coinAddr, avField };
}

export async function fetchMetadata(tokenID, avField) {
  try {
    const fetchedData = await fetch(
      "https://metadata.ens.domains/mainnet/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/" +
        tokenID
    ).then((res) => res.json());
    fetchedData.tokenID = tokenID;
    fetchedData.avField = avField;
    console.log(fetchedData);
    return fetchedData;
  } catch (error) {
    return new Error(error.message);
  }
}
