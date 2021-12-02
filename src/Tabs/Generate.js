import {
  Clear,
  Close,
  ContentCopy,
  ImageNotSupported,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Card,
  CardActionArea,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import { ENSNFTTemplate } from "../other/ENSNFTTemplate";

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "4px",
  img: {
    borderRadius: "6px",
  },
  backgroundColor: "#d8d8d8",
}));

const NFTCardComponent = styled(CardActionArea)(({ theme }) => ({
  padding: "10px",
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
}));

const ENSNFTTemplateComponent = styled(ENSNFTTemplate)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "7px",
}));

const DisplayCardComponent = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.3)",
  borderRadius: "8px",
}));

const DisplayCardGrid = styled(Grid)(({ theme }) => ({
  padding: "10px",
  maxHeight: "320px",
}));

export function Generate(props) {
  const { metadata, address, allNFTs } = props;
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleNFTSelect = (nft) => setSelectedNFT(nft);
  const NFTString = () =>
    `eip155:1/${selectedNFT.asset_contract.schema_name.toLowerCase()}:${
      selectedNFT.asset_contract.address
    }/${selectedNFT.token_id}`;

  const DisplayCardComponentGenerator = (props) => (
    <Grid item flexShrink={1}>
      <DisplayCardComponent>
        <DisplayCardGrid container flexDirection="column">
          <Typography
            position="absolute"
            mt="-27px"
            textAlign="left"
            color={
              props.disabled ? "rgba(0, 0, 0, 0.30)" : "rgba(0, 0, 0, 0.50)"
            }
            zIndex="1"
            bgcolor="#f5f5f5"
            variant="h6"
          >
            {props.title}
          </Typography>
          <Grid item zIndex="100">
            {props.disabled ? (
              <AvatarComponent variant="square">
                <ImageNotSupported fontSize="large" />
              </AvatarComponent>
            ) : (
              props.children
            )}
          </Grid>
        </DisplayCardGrid>
      </DisplayCardComponent>
    </Grid>
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      minWidth="300px"
      width="100%"
      rowSpacing={3}
    >
      <Grid
        item
        alignItems="center"
        justifyContent="space-around"
        container
        xs={12}
      >
        <DisplayCardComponentGenerator disabled={!metadata.hasNFT} title="NFT">
          {selectedNFT ? (
            <ENSNFTTemplateComponent
              name={metadata.name}
              src={selectedNFT.image_url}
            />
          ) : (
            <AvatarComponent variant="square" src={metadata.image_url} />
          )}
        </DisplayCardComponentGenerator>
        <DisplayCardComponentGenerator
          disabled={!metadata.background_image && !selectedNFT}
          title="Avatar"
        >
          {selectedNFT ? (
            <AvatarComponent variant="square" src={selectedNFT.image_url} />
          ) : (
            <AvatarComponent variant="square" src={metadata.background_image} />
          )}
        </DisplayCardComponentGenerator>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={alertOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ width: "100%" }}
          >
            Copied to clipboard
          </Alert>
        </Collapse>
      </Grid>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={12}
        width={"100%"}
      >
        <Grid item xs={selectedNFT ? 8 : 10} md={selectedNFT ? 10 : 11}>
          <FormControl fullWidth>
            <OutlinedInput
              value={selectedNFT ? NFTString() : ""}
              placeholder="Generated Avatar String"
              readOnly={true}
            />
          </FormControl>
        </Grid>
        <Grid item pl={3} xs={2} md={1}>
          <Tooltip title="Copy to Clipboard">
            <IconButton
              disabled={selectedNFT === null}
              onClick={() => [
                navigator.clipboard.writeText(NFTString()),
                setAlertOpen(true),
              ]}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Grid>
        {selectedNFT ? (
          <Grid item pl={3} xs={2} md={1}>
            <Tooltip title="Clear Current Selection">
              <IconButton onClick={() => setSelectedNFT(null)}>
                <Clear />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
      {address !== "" && allNFTs[0] !== undefined ? (
        <Grid item container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="left">
              NFTs
            </Typography>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            {allNFTs.map((nft) => (
              <Grid item xs={6} md={3} key={nft.id}>
                <Card
                  onClick={() => handleNFTSelect(nft)}
                  raised={nft === selectedNFT}
                >
                  <NFTCardComponent>
                    <NFTImageComponent src={nft.image_thumbnail_url} />
                    <Typography fontWeight="500" textAlign="left">
                      {nft.asset_contract.name
                        ? nft.asset_contract.name
                        : "Unknown Contract"}
                    </Typography>
                    <Typography textAlign="left">
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
        </Grid>
      ) : null}
    </Grid>
  );
}
