import { providers } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/46b0a71b78c04d519ebebc35e8579775"
);

export async function fetchEns(name) {
  const resolver = await provider.getResolver(name);
  return resolver;
}

export async function fetchAddress(name) {
  const address = await provider.resolveName(name);
  return address;
}
