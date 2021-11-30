import { useState } from "react";
import { Generate } from "./Generate";
import { View } from "./View";

export function TabManager(props) {
  const { currentTab, address, metadata, allNFTs } = props;
  const tabs = [
    <View address={address} metadata={metadata} />,
    <Generate address={address} metadata={metadata} allNFTs={allNFTs} />,
  ];

  return tabs[currentTab];
}
