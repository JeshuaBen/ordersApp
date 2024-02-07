import { Link, LinkProps } from "expo-router";

type TLinkButtonProps = LinkProps<string> & {
  title: string;
};

export const LinkButton: React.FC<TLinkButtonProps> = ({ title, ...rest }) => {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
};
