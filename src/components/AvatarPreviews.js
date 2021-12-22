import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { OneInch } from "./Previews/1inch";
import { ENSAv } from "./Previews/ENS";
import { Uniswap } from "./Previews/Uniswap";

const PreviewItemContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    height: "100px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "65px",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
}));

const PreviewContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexGrow: 0,
    width: "auto",
  },
}));

const PreviewItem = ({ title, children }) => (
  <PreviewItemContainer
    item
    container
    md={2}
    xs={11}
    flexDirection={"column"}
    justifyContent={"space-between"}
  >
    <PreviewContainer
      item
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      flexGrow={1}
    >
      {children}
    </PreviewContainer>
    <Grid item>
      <Typography>{title}</Typography>
    </Grid>
  </PreviewItemContainer>
);

export const AvatarPreviews = ({ imgToUse, name, address, balance }) => {
  return (
    <Grid
      container
      item
      xs={12}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"row"}
    >
      <PreviewItem title="Uniswap">
        <Uniswap src={imgToUse} name={name} balance={balance} />
      </PreviewItem>
      <PreviewItem title="1inch">
        <OneInch src={imgToUse} name={name} balance={balance} />
      </PreviewItem>
      <PreviewItem title="ENS">
        <ENSAv src={imgToUse} name={name} address={address} />
      </PreviewItem>
    </Grid>
  );
};
