import { Generate } from "./Generate";
import { View } from "./View";

export function TabManager(props) {
  const { currentTab } = props;
  const tabs = [<View />, <Generate />];

  return tabs[currentTab];
}
