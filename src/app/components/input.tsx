import classNames from "classnames";
import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";

export const Input = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    const { className, ...inputProps } = props;
    return (
      <input
        ref={ref}
        className={classNames(
          className,
          "border-slate-200 border-2 rounded-xl px-2 focus:border-slate-400 hover:border-slate-300 outline-none"
        )}
        {...inputProps}
      />
    );
  }
);
