import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Fragment, useState } from "react";
import "./App.css";
import { AvatarDisplays } from "./components/AvatarDisplays/AvatarDisplays";
import { NFTViewComponent } from "./components/Other/NFTViewComponent";
import { AvatarField } from "./components/TextFields/AvatarField";
import { NameField } from "./components/TextFields/NameField";
import { checkNFTMetadata, fetchEns, fetchMetadata } from "./data/loadens";
import { loadAllNFTs } from "./data/loadopensea";

const BackgroundBox = styled(Grid)`
  background-color: #eaeef3;
  min-height: 100vh;
  padding-bottom: 25px;
  padding-top: 25px;
`;

const ForegroundBox = styled(Paper)`
  width: 100%;
  background-color: #f5f5f5;
  padding: 25px;
`;

const AlertComponent = (msg, setFunc) => (
  <Dialog onClose={() => setFunc("")} open={msg !== ""}>
    <DialogContent>{msg}</DialogContent>
    <DialogActions>
      <Button onClick={() => setFunc("")}>Close</Button>
    </DialogActions>
  </Dialog>
);

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(false);
  const [allNFTs, setAllNFTs] = useState([]);
  const [errAlert, setErrAlert] = useState("");
  const [positiveAlert, setPositiveAlert] = useState("");
  const [selectedNFT, _setSelectedNFT] = useState(null);

  const ErrorAlert = () => AlertComponent(errAlert, setErrAlert);
  const PositiveAlert = () => AlertComponent(positiveAlert, setPositiveAlert);

  const clearSearch = () =>
    Promise.all([
      setName(""),
      setAddress(""),
      setMetadata({}),
      setAllNFTs([]),
      setSelectedNFT(null),
    ]);

  const submitNewName = async () => {
    setLoading(true);
    return fetchEns(name)
      .then(({ tokenID, address, avField, hasNFT, formattedName }) =>
        Promise.all([
          setAddress(address),
          fetchMetadata(tokenID, avField, hasNFT),
          loadAllNFTs(address),
          setName(formattedName),
        ])
      )
      .then((returned) => [setMetadata(returned[1], setAllNFTs(returned[2]))])
      .then(() => setLoading(false))
      .catch((err) => [setErrAlert(err.message), setLoading(false)]);
  };

  const setSelectedNFT = async (nft) => {
    if (nft === null) return _setSelectedNFT(null);
    setLoading(true);
    await checkNFTMetadata(nft)
      .then((nft) => _setSelectedNFT(nft))
      .catch((err) => setErrAlert(err.message));
    setLoading(false);
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <BackgroundBox
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100%"
        rowGap={3}
      >
        <ErrorAlert />
        <PositiveAlert />
        {address !== "" ? (
          <Fragment>
            <AvatarDisplays metadata={metadata} selectedNFT={selectedNFT} />

            <Grid
              item
              container
              alignItems="center"
              justifyContent="flex-start"
              xs={11}
              md={9}
              pl="25px"
            >
              <Typography
                color="GrayText"
                variant="h6"
                lineHeight="1"
                textAlign="left"
              >
                Name Info
              </Typography>
            </Grid>
          </Fragment>
        ) : null}

        {address === "" ? (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-start"
            xs={11}
            md={9}
            pl="25px"
          >
            <Typography
              color="GrayText"
              variant="h6"
              lineHeight="1"
              textAlign="left"
            >
              Enter an ENS name to get started
            </Typography>
          </Grid>
        ) : null}

        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={11}
          md={9}
        >
          <ForegroundBox elevation={1}>
            <NameField
              name={name}
              setName={setName}
              submitNewName={submitNewName}
              address={address}
              clearSearch={clearSearch}
            />
          </ForegroundBox>
        </Grid>

        {address !== "" ? (
          <Fragment>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="flex-start"
              xs={11}
              md={9}
              pl="25px"
              mt={3}
            >
              <Typography
                color="GrayText"
                variant="h6"
                lineHeight="1"
                textAlign="left"
              >
                Avatar Info
              </Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={11}
              md={9}
            >
              <ForegroundBox elevation={1}>
                <AvatarField
                  selectedNFT={selectedNFT}
                  setSelectedNFT={setSelectedNFT}
                  metadata={metadata}
                  setPositiveAlert={setPositiveAlert}
                />
              </ForegroundBox>
            </Grid>
          </Fragment>
        ) : null}

        {allNFTs.length > 0 ? (
          <Fragment>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="flex-start"
              xs={11}
              md={9}
              pl="25px"
              mt={3}
            >
              <Typography
                color="GrayText"
                variant="h6"
                lineHeight="1"
                textAlign="left"
              >
                NFTs
              </Typography>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              xs={11}
              md={9}
            >
              <NFTViewComponent
                allNFTs={allNFTs}
                selectedNFT={selectedNFT}
                handleNFTSelect={setSelectedNFT}
              />
            </Grid>
          </Fragment>
        ) : null}
      </BackgroundBox>
      <Backdrop sx={{ color: "#fff", zIndex: 10000 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
