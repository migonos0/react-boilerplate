interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  return <p className="text-red-400">{props.error}</p>;
};
