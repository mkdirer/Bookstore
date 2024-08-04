import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import i18n from "../../assets/locales/translate";
import { FormPanel } from "../boxes/FormPanel";
import { useState } from "react";
import { loadAvatar, avatarList } from "../../assets/avatars/loadAvatar";
import { updateIcon } from "../../utils/fetch/fetch";

/**
 * @typedef {object} PropsSelectAvatarForm
 * @property {string} avatar - The currently selected avatar.
 * */
interface PropsSelectAvatarForm {
  avatar: string;
}
/**
 * The SelectAvatarForm component allows the user to select and display an avatar.
 * @param {PropsSelectAvatarForm} props - The props for the component.
 * @returns {JSX.Element} - The rendered SelectAvatarForm component.
 * */
const SelectAvatarForm: React.FC<PropsSelectAvatarForm> = ({
  avatar,
}: PropsSelectAvatarForm): JSX.Element => {
  const [photo, setPhoto] = useState(avatar);
  const [path, setPath] = useState(loadAvatar(photo || "", "L"));
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event;
    setPhoto(value);
    setPath(loadAvatar(value, "L"));
  };

  const updateAvatarInSession = (newAvatar: string): void => {
    const sessionDataString = localStorage.getItem('sessionData');
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
      sessionData.avatar = newAvatar;
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }
  };
  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  const handleUpdate = () => {
    updateIcon(parseInt(localStorage.getItem("userID") || "1"), photo);
    updateAvatarInSession(photo)
  };

  return (
    <FormPanel
      title={i18n.t("select user avatar") || "change your information"}
      sx={{ width: 400, mx: "auto" }}
    >
      <Stack direction="column" alignSelf="center">
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            backgroundColor: "#BDBDBD",
            border: "2px solid black",
            overflow: "hidden",
          }}
        >
          <Avatar
            variant="square"
            sx={{ height: 150, width: 150, m: 3.5 }}
            alt={photo}
            src={path}
          />
        </Box>

        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel> Avatar </InputLabel>
          <Select
            open={open}
            onChange={handleChange}
            onClose={handleClose}
            onOpen={handleOpen}
            value={photo}
            label="Avatar"
            MenuProps={MenuProps}
          >
            <MenuItem value="">None</MenuItem>
            {avatarList.map((avatar) => (
              <MenuItem value={avatar} key={avatar}>
                {avatar}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={() => handleUpdate()}
        >
          {i18n.t("save") || "save"}
        </Button>
      </Stack>
    </FormPanel>
  );
};

export { SelectAvatarForm };
