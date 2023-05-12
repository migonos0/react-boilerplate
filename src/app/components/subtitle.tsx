interface SubtitleProps {
  value?: string;
}

export const Subtitle = (props: SubtitleProps) => {
  return <h2 className="text-lg">{props.value}</h2>;
};
