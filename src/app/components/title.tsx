interface TitleProps {
  value?: string;
}

export const Title = (props: TitleProps) => {
  return <h1 className="text-xl font-bold">{props.value}</h1>;
};
