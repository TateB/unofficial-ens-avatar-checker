import { ImageNotSupported } from "@mui/icons-material";
import { Avatar, Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

const DisplayCardComponent = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(0, 0, 0, 0.3)",
  borderRadius: "8px",
}));

const DisplayCardGrid = styled(Grid)(({ theme }) => ({
  padding: "10px",
  maxHeight: "320px",
}));

export const AvatarComponent = styled(Avatar)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "4px",
  img: {
    borderRadius: "6px",
  },
  backgroundColor: "#eaeef3",
}));

export const AvatarDisplayTemplate = (props) => {
  if (!props.disabled)
    return (
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
              bgcolor="#eaeef3"
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
  return null;
};
