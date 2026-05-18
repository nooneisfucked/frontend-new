import { Button as MuiButton } from '@mui/material';

function Button({ children, onClick, variant = "contained", color = "primary", ...props }) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default Button;