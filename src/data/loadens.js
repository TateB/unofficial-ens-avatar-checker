import { providers, utils } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/46b0a71b78c04d519ebebc35e8579775"
);

export async function fetchEns(name) {
  if (name.endsWith(".eth")) name = name.substring(0, name.length - 4);
  const formattedName = name + ".eth";
  const resolver = await provider.getResolver(formattedName);
  const tokenID = utils.id(name);
  const address = await resolver.getAddress();
  const avField = await resolver.getAvatar();
  return { tokenID, address, avField };
}

export async function fetchMetadata(tokenID, avField) {
  try {
    const fetchedData = await fetch(
      "https://metadata.ens.domains/mainnet/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/" +
        tokenID
    ).then((res) => res.json());
    fetchedData.tokenID = tokenID;
    fetchedData.avField = avField;
    return fetchedData;
  } catch (error) {
    return new Error(error.message);
  }
}
