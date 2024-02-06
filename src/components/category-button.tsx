import clsx from "clsx";
import { Text, Pressable, PressableProps } from "react-native";

type TCategoryButtonProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export const CategoryButton: React.FC<TCategoryButtonProps> = ({
  title,
  isSelected,
  ...rest
}) => {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-4 justify-center rounded-md h-10",
        isSelected && "border-2 border-lime-300"
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm ">{title}</Text>
    </Pressable>
  );
};
