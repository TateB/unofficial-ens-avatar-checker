import { ImageNotSupported } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
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
      {props.customUrl || props.selectedNFT ? (
        <ENSNFTAvatarTemplate
          name={props.metadata.name}
          src={props.customUrl || props.selectedNFT.cached_file_url}
        />
      ) : (
        <AvatarComponent variant="square" src={props.metadata.image_url} />
      )}
    </AvatarDisplayTemplate>
    <AvatarDisplayTemplate
      disabled={
        !props.metadata.background_image &&
        !props.selectedNFT &&
        !props.customUrl
      }
      title="Avatar"
    >
      {props.customUrl || props.selectedNFT ? (
        <AvatarComponent
          variant="square"
          src={props.customUrl || props.selectedNFT.cached_file_url}
        />
      ) : (
        <AvatarComponent variant="square" src={props.metadata.background_image}>
          <ImageNotSupported fontSize="large" color="disabled" />
        </AvatarComponent>
      )}
    </AvatarDisplayTemplate>
    {!props.metadata.hasNFT &&
    !props.metadata.background_image &&
    !props.selectedNFT &&
    !props.customUrl ? (
      <Typography>Please select an NFT to preview your avatar.</Typography>
    ) : null}
  </Grid>
);
