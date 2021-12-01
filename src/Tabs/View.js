import { Launch } from "@mui/icons-material";
import { Avatar, Button, Grid, Link } from "@mui/material";
import { styled } from "@mui/system";

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "4px",
  img: {
    borderRadius: "6px",
  },
}));

export function View(props) {
  const { metadata } = props;

  const makeAvatarLink = (avField) => {
    if (avField.startsWith("eip155:1"))
      return "https://opensea.io/assets/" + metadata.avField.split(":")[2];
    if (avField.startsWith("https://")) return avField;
    if (avField.startsWith("ipfs://")) return "https://ipfs.io/ipfs/" + avField;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={3}
    >
      <Grid item xs={12}>
        {metadata.image_url ? (
          <AvatarComponent variant="square" src={metadata.image_url} />
        ) : (
          <AvatarComponent variant="square"></AvatarComponent>
        )}
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent="flex-start"
        alignItems="flex-start"
        columnSpacing={2}
      >
        <Grid item>
          <Button
            LinkComponent={Link}
            disabled={!metadata.tokenID}
            href={
              "https://opensea.io/assets/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/" +
              metadata.tokenID
            }
            variant="outlined"
            endIcon={<Launch />}
            size="small"
          >
            ENS Name
          </Button>
        </Grid>
        <Grid item>
          <Button
            LinkComponent={Link}
            disabled={!metadata.avField}
            href={metadata.avField ? makeAvatarLink(metadata.avField) : ""}
            variant="outlined"
            endIcon={<Launch />}
            size="small"
          >
            Avatar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
