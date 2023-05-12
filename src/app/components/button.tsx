import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | number;
}

export const Button = (props: ButtonProps) => {
  const { children, className, ...buttonProps } = props;
  return (
    <button
      className={classNames(
        className,
        "rounded-xl bg-slate-200 active:bg-slate-400 hover:bg-slate-300"
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
