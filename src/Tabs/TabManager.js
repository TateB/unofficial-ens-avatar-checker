import { Generate } from "./Generate";
import { View } from "./View";

export function TabManager(props) {
  const { currentTab, address, metadata, allNFTs } = props;
  const tabs = [
    <Generate address={address} metadata={metadata} allNFTs={allNFTs} />,
    <View address={address} metadata={metadata} />,
  ];

  return tabs[currentTab];
}
