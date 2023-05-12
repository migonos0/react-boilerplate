import { ReactNode } from "react";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return <div className="h-screen w-screen">{props.children}</div>;
};
