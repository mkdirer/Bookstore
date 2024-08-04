import { Avatar, Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import { useState } from "react";
import { FormWrapper } from "../modal-button/FormWrapper";
import { SelectAvatarForm } from "../forms/SelectAvatarForm";
import { loadAvatar } from "../../assets/avatars/loadAvatar";

interface PropsUserProfilePhoto {
  name: string;
  surname: string;
  photo: string;
}

/**
 * The UserProfilePhoto component displays a user's photo
 * @param {PropsUserProfilePhoto} props - The props for the component.
 * @returns {JSX.Element} - The rendered UserProfilePhoto component.
 */
const UserProfilePhoto: React.FC<PropsUserProfilePhoto> = ({
  name,
  surname,
  photo,
}: PropsUserProfilePhoto): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      sx={{
        height: 260,
        width: 220,
        px: 4,
        py: 2.4,
        border: "2px solid black",
        borderRadius: 4,
        ml: 1,
        mr: 2
      }}
    >
      <Stack sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            mb: 1.6,
          }}
        >
          {name} {surname}
        </Typography>
        <Stack
          direction="row"
          alignSelf="center"
          sx={{ backgroundColor: "#000", borderRadius: "50%" }}
        >
          <Tooltip title={i18n.t("edit button") || "edit"}>
            <Box
              onClick={handleOpen}
              sx={{
                width: 200,
                height: 200,
                backgroundColor: "#BDBDBD",
                borderRadius: "50%",
                border: "2px solid black",
                overflow: "hidden",
                "&:hover": {
                  boxShadow: 8,
                  opacity: 0.5,
                },
              }}
            >
              <Avatar
                variant="square"
                sx={{
                  height: 150,
                  width: 150,
                  m: 3.5,
                }}
                alt={i18n.t("profile photo") || "profile photo"}
                src={loadAvatar(photo || "", "L")}
              />
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
      <FormWrapper isOpen={open} onClose={handleClose}>
        <SelectAvatarForm avatar={photo} />
      </FormWrapper>
    </Paper>
  );
};

export type { PropsUserProfilePhoto };
export { UserProfilePhoto };
