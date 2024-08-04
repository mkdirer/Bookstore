import { Button, Typography } from "@mui/material";

/**
 * The props for the HeaderButton component.
 * @typedef {object} PropsDefualtButton
 * @property {string} label - The label to be displayed on the button.
 * @property {string} href - Reference to ?.
 */
interface PropsHeaderButton {
  label: string;
  href: string;
}

/**
 * The HeaderButton component is a styled MaterialUI Button component in header configuration.
 * @param {PropsHeaderButton} props - The props for the component.
 * @returns {JSX.Element} - The rendered button component.
 */
const HeaderButton: React.FC<PropsHeaderButton> = ({
  label,
  href,
}: PropsHeaderButton): JSX.Element => {
  // const {label, href} = props;

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ color: "secondary.main", height: 90, width: 160 }}
      href={href}
    >
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {label}
      </Typography>
    </Button>
  );
};

export type { PropsHeaderButton };
export { HeaderButton };
