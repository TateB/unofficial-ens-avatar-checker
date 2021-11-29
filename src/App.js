import "./App.css";
import {
  Tab,
  Tabs,
  Box,
  Paper,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  InputAdornment,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { TabManager } from "./Tabs/TabManager";
import { ContentCopy, Send } from "@mui/icons-material";
import { fetchAddress } from "./data/loadens";

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
  background-color: #f5f5f5;
`;

const TabContentBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 2;
  padding: 25px;
`;

const TranslucentLabel = styled(InputLabel)`
  background-color: #f5f5f5;
`;

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [name, setName] = useState("");

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  const submitNewName = () =>
    fetchAddress(name + ".eth").then((address) => console.log(address));

  return (
    <div className="App">
      <BackgroundBox elevation={0}>
        <ForegroundBox elevation={1}>
          <Grid
            padding={3}
            container
            item
            justifyContent="center"
            alignItems="center"
            xs={12}
            width={"100%"}
          >
            <Grid item xs={9}>
              <FormControl variant="outlined" fullWidth={true}>
                <TranslucentLabel variant="outlined">ENS Name</TranslucentLabel>
                <OutlinedInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  notched={true}
                  endAdornment={
                    <InputAdornment position="end">.eth</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item pl={3} flexGrow={1}>
              <Tooltip title="Submit">
                <IconButton color="primary" onClick={submitNewName}>
                  <Send />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="View" sx={{ fontWeight: 600 }} />
            <Tab label="Generate" sx={{ fontWeight: 600 }} />
          </Tabs>
          <TabContentBox>
            <TabManager currentTab={currentTab} />
          </TabContentBox>
        </ForegroundBox>
      </BackgroundBox>
    </div>
  );
}

export default App;
