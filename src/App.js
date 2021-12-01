import { Close, Search } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import "./App.css";
import { fetchEns, fetchMetadata } from "./data/loadens";
import { loadAllNFTs } from "./data/loadopensea";
import { TabManager } from "./Tabs/TabManager";

const BackgroundBox = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 40px);
  padding: 20px;
`;

const ForegroundBox = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 1;
  width: calc(100% - 30px);
  background-color: #f5f5f5;
  padding: 25px;
`;

const TabContentBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 2;
  margin-top: 20px;
  width: 100%;
`;

const TranslucentLabel = styled(InputLabel)`
  background-color: #f5f5f5;
`;

const AddressBox = styled(Box)`
  padding: 10px 0;
`;

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(false);
  const [allNFTs, setAllNFTs] = useState([]);
  const [errAlert, setErrAlert] = useState("");

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const submitNewName = async () => {
    setLoading(true);
    return fetchEns(name)
      .then(({ tokenID, address, avField }) =>
        Promise.all([
          setAddress(address),
          fetchMetadata(tokenID, avField),
          loadAllNFTs(address),
        ])
      )
      .then((returned) => [setMetadata(returned[1], setAllNFTs(returned[2]))])
      .then(() => setLoading(false))
      .catch((err) => [setErrAlert(err.message), setLoading(false)]);
  };

  return (
    <div className="App">
      <BackgroundBox elevation={0}>
        <ForegroundBox elevation={1}>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            width={"100%"}
          >
            <Grid item xs={12} mb={errAlert !== "" ? 3 : 0}>
              <Collapse in={errAlert !== ""}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrAlert("");
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errAlert}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={10} md={11}>
              <FormControl variant="outlined" fullWidth={true}>
                <TranslucentLabel variant="outlined">ENS Name</TranslucentLabel>
                <OutlinedInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  notched={true}
                  onKeyPress={(e) =>
                    e.key === "Enter" ? submitNewName() : null
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} md={1} pl={2}>
              <Tooltip title="Submit">
                <IconButton
                  color="primary"
                  disabled={name.length < 3}
                  onClick={submitNewName}
                >
                  <Search />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <AddressBox>
            {address ? (
              <Link
                href={"https://etherscan.io/address/" + address}
                underline="none"
              >
                {address.substr(0, 6)}...{address.substr(address.length - 6, 6)}
              </Link>
            ) : (
              <Typography>No Address</Typography>
            )}
          </AddressBox>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="View" sx={{ fontWeight: 600 }} />
            <Tab label="Generate" sx={{ fontWeight: 600 }} />
          </Tabs>
          <TabContentBox>
            <TabManager
              currentTab={currentTab}
              address={address}
              metadata={metadata}
              allNFTs={allNFTs}
            />
          </TabContentBox>
        </ForegroundBox>
      </BackgroundBox>
      <Backdrop sx={{ color: "#fff", zIndex: 10000 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
