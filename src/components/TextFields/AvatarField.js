import { Clear, ContentCopy } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { validateNewInput } from "../../data/loadens";

const NFTString = ({ contractSchema, contract_address, token_id }) =>
  `eip155:1/${contractSchema.toLowerCase()}:${contract_address}/${token_id}`;

export const AvatarField = (props) => {
  const { selectedNFT, metadata } = props;
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [inputTimeout, setInputTimeout] = useState(null);
  const isOriginal = value === metadata.avField;

  useEffect(() => {
    if (selectedNFT) {
      props.newUrlCallback(null);
      setValue(NFTString(selectedNFT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNFT]);

  useEffect(() => {
    if (metadata.avField) {
      props.newUrlCallback(null);
      setValue(metadata.avField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata]);

  useEffect(() => {
    return () => [clearTimeout(inputTimeout), props.newUrlCallback(null)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(value, selectedNFT);
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(false);
    clearTimeout(inputTimeout);
    setInputTimeout(
      setTimeout(() => {
        const newInput = event.target.value;
        if (newInput === "" || !newInput) return props.newUrlCallback(null);
        validateNewInput(newInput).then((res) => {
          if (!res) return setError(true);
          props.newUrlCallback(res);
          props.setSelectedNFT(null);
        });
      }, 500)
    );
  };

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      xs={12}
      width={"100%"}
    >
      <Grid item xs={!isOriginal ? 8 : 10} md={!isOriginal ? 10 : 11}>
        <FormControl fullWidth>
          <OutlinedInput
            error={error}
            value={value}
            placeholder="Avatar String (enter your own URL if you want to preview a custom one)"
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item pl={2} xs={2} md={1}>
        <Tooltip title="Copy to Clipboard">
          <span>
            <IconButton
              disabled={value === "" || error}
              onClick={() => [
                navigator.clipboard.writeText(value),
                props.setPositiveAlert("Copied to Clipboard"),
              ]}
            >
              <ContentCopy />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      {!isOriginal ? (
        <Grid item pl={3} xs={2} md={1}>
          <Tooltip title="Clear Current Selection">
            <span>
              <IconButton
                onClick={() => [
                  props.setSelectedNFT(null),
                  props.newUrlCallback(null),
                  setValue(metadata.avField),
                ]}
              >
                <Clear />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      ) : null}
    </Grid>
  );
};
