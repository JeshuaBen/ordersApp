import { ReactNode } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from "react-native";

type TButtonProps = TouchableOpacityProps & {
  children: ReactNode;
};

type TButtonTextProps = {
  children: ReactNode;
};

type TButtonIconProps = {
  children: ReactNode;
};

const Button = ({ children, ...rest }: TButtonProps) => {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row "
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({ children }: TButtonTextProps) => {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
};

const ButtonIcon = ({ children }: TButtonIconProps) => {
  return <View>{children}</View>;
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
