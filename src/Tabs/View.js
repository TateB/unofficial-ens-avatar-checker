import { Launch } from "@mui/icons-material";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "4px",
}));

const TextFieldComponent = styled(TextField)`
  width: "100%";
`;

export function View() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={3}
    >
      <Grid item xs={12}>
        <AvatarComponent variant="square"></AvatarComponent>
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
          <Button variant="outlined" endIcon={<Launch />} size="small">
            ENS Name
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" endIcon={<Launch />} size="small">
            Avatar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
