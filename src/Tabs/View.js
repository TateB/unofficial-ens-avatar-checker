import { Launch } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "4px",
  img: {
    borderRadius: "6px",
  },
}));

const TextFieldComponent = styled(TextField)`
  width: "100%";
`;

export function View(props) {
  const { address, metadata } = props;

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
            href={
              metadata.avField
                ? "https://opensea.io/assets/" +
                  metadata.avField.linkage[0].content.split(":")[2]
                : null
            }
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
