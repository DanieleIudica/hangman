import { styled } from "@stitches/react";

const StyledButton = styled("button", {
  backgroundColor: "#adb4d3bd",
  padding: "1rem",
  borderRadius: "16px",
  cursor: "pointer",
  margin: "0px 16px",
  transition: "background-color 0.2s ease",

  "&:hover, &:focus": {
    backgroundColor: "#7480bbbd",
  },
});

interface CustomButtonProps {
  children: string;
  onClick: () => void;
}

function Button({ children, onClick }: CustomButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
