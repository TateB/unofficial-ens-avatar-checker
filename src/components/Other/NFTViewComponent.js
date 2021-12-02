import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const NFTCardComponent = styled(CardActionArea)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  height: "100%",
}));

const NFTImageComponent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "src",
})(({ src }) => ({
  backgroundImage: `url(${src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  width: "100%",
  height: "100%",
  minHeight: "100px",
  minWidth: "100px",
  marginBottom: "5px",
  flexGrow: "1",
}));

export const NFTViewComponent = (props) => (
  <Grid item container xs={12} spacing={2}>
    {props.allNFTs.map((nft) => (
      <Grid item xs={6} md={3} key={nft.id} justifySelf="stretch">
        <Card
          onClick={() => props.handleNFTSelect(nft)}
          raised={nft === props.selectedNFT}
          sx={{ height: "100%" }}
        >
          <NFTCardComponent>
            <NFTImageComponent src={nft.image_thumbnail_url} />
            <Typography
              fontWeight="500"
              alignSelf="flex-start"
              textAlign="left"
            >
              {nft.asset_contract.name
                ? nft.asset_contract.name
                : "Unknown Contract"}
            </Typography>
            <Typography alignSelf="flex-start" textAlign="left">
              {nft.name
                ? nft.name.length > 15
                  ? nft.name.substr(0, 15) + "..."
                  : nft.name
                : "Unknown Name"}
            </Typography>
          </NFTCardComponent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
