import { Clear, Search } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Fragment } from "react";

const TranslucentLabel = styled(InputLabel)`
  background-color: #f5f5f5;
`;

export const NameField = (props) => (
  <Grid container item justifyContent="center" alignItems="center" xs={12}>
    {props.address === "" ? (
      <Fragment>
        <Grid item xs={10} md={11}>
          <FormControl variant="outlined" fullWidth={true}>
            <TranslucentLabel variant="outlined">ENS Name</TranslucentLabel>
            <OutlinedInput
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              notched={true}
              onKeyPress={(e) =>
                e.key === "Enter" ? props.submitNewName() : null
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={2} md={1} pl={2}>
          <Tooltip title="Submit">
            <span>
              <IconButton
                color="primary"
                disabled={props.name.length < 3}
                onClick={props.submitNewName}
              >
                <Search />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Fragment>
    ) : (
      <Fragment>
        <Grid
          item
          container
          xs={10}
          md={11}
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="row"
          columnGap={3}
        >
          <Grid
            item
            container
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
          >
            <Grid item>
              <Typography lineHeight="1">
                <b>{props.name}</b>
              </Typography>
            </Grid>
            <Grid item mt="-2px">
              <Link
                href={"https://etherscan.io/address/" + props.address}
                underline="none"
                lineHeight="1"
                fontSize="1rem"
                fontWeight="400"
              >
                {props.address.substr(0, 6)}...
                {props.address.substr(props.address.length - 6, 6)}
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} md={1} pl={2}>
          <Tooltip title="Clear Search">
            <IconButton color="default" onClick={props.clearSearch}>
              <Clear />
            </IconButton>
          </Tooltip>
        </Grid>
      </Fragment>
    )}
  </Grid>
);
