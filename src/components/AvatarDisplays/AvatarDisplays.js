import { ImageNotSupported } from "@mui/icons-material";
import { Grid } from "@mui/material";
import {
  AvatarComponent,
  AvatarDisplayTemplate,
} from "./AvatarDisplayTemplate";
import { ENSNFTAvatarTemplate } from "./ENSNFTAvatarTemplate";

export const AvatarDisplays = (props) => (
  <Grid
    item
    alignItems="center"
    justifyContent="center"
    container
    xs={12}
    columnGap={6}
    rowGap={3}
  >
    <AvatarDisplayTemplate disabled={!props.metadata.hasNFT} title="NFT">
      {props.selectedNFT ? (
        <ENSNFTAvatarTemplate
          name={props.metadata.name}
          src={props.selectedNFT.image_url}
        />
      ) : (
        <AvatarComponent variant="square" src={props.metadata.image_url} />
      )}
    </AvatarDisplayTemplate>
    <AvatarDisplayTemplate
      disabled={!props.metadata.background_image && !props.selectedNFT}
      title="Avatar"
    >
      {props.selectedNFT ? (
        <AvatarComponent variant="square" src={props.selectedNFT.image_url} />
      ) : (
        <AvatarComponent variant="square" src={props.metadata.background_image}>
          <ImageNotSupported fontSize="large" color="disabled" />
        </AvatarComponent>
      )}
    </AvatarDisplayTemplate>
  </Grid>
);
