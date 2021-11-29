import { ContentCopy } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";

export function Generate() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      minWidth="300px"
    >
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        xs={12}
        width={"100%"}
      >
        <Grid item flexGrow={1}>
          <FormControl fullWidth={true}>
            <OutlinedInput
              placeholder="Generated Avatar String"
              readOnly={true}
            />
          </FormControl>
        </Grid>
        <Grid item pl={3}>
          <Tooltip title="Copy to Clipboard">
            <IconButton>
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}
