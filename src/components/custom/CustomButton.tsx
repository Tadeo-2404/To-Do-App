import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = {
  text: string;
  size?: ButtonProps['size'];
  type?: ButtonProps['type'];
  href?: ButtonProps['href'];
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const CustomButton = ({
  text,
  type,
  href,
  size,
  variant,
  color,
  startIcon,
  endIcon,
}: CustomButtonProps) => {
  return (
    <div>
      <Button size={size} type={type} href={href} variant={variant} color={color} startIcon={startIcon} endIcon={endIcon}>
        {text}
      </Button>
    </div>
  );
};
