import { Clear, ContentCopy } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Tooltip,
} from "@mui/material";

const NFTString = (selectedNFT) =>
  `eip155:1/${selectedNFT.asset_contract.schema_name.toLowerCase()}:${
    selectedNFT.asset_contract.address
  }/${selectedNFT.token_id}`;

export const AvatarField = (props) => (
  <Grid
    container
    item
    justifyContent="center"
    alignItems="center"
    xs={12}
    width={"100%"}
  >
    <Grid item xs={props.selectedNFT ? 8 : 10} md={props.selectedNFT ? 10 : 11}>
      <FormControl fullWidth>
        <OutlinedInput
          value={
            props.selectedNFT
              ? NFTString(props.selectedNFT)
              : props.metadata.avField || ""
          }
          placeholder="Generated Avatar String"
          readOnly={true}
        />
      </FormControl>
    </Grid>
    <Grid item pl={2} xs={2} md={1}>
      <Tooltip title="Copy to Clipboard">
        <IconButton
          disabled={props.selectedNFT === null}
          onClick={() => [
            navigator.clipboard.writeText(NFTString(props.selectedNFT)),
            props.setPositiveAlert("Copied to Clipboard"),
          ]}
        >
          <ContentCopy />
        </IconButton>
      </Tooltip>
    </Grid>
    {props.selectedNFT ? (
      <Grid item pl={3} xs={2} md={1}>
        <Tooltip title="Clear Current Selection">
          <IconButton onClick={() => props.setSelectedNFT(null)}>
            <Clear />
          </IconButton>
        </Tooltip>
      </Grid>
    ) : null}
  </Grid>
);
