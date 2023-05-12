import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...inputProps } = props;
  return (
    <input
      className={classNames(
        className,
        "border-slate-200 border-2 rounded-xl px-2 focus:border-slate-400 hover:border-slate-300 outline-none"
      )}
      {...inputProps}
    />
  );
};
