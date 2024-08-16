import { Loader as Icon } from 'lucide-react';
import React from 'react';
type LoaderProps =
  | {
      condition: boolean;
      title?: never;
      children?: React.ReactNode;
    }
  | {
      condition: boolean;
      title: string;
      children?: never;
    };

const Loading: React.FC = () => <Icon className="animate-spin" />;

const Loader: React.FC<LoaderProps> = ({ children, title, condition }) => {
  if (condition) return <Loading />;
  return (
    <div>
      {title && <span>{title}</span>}
      {children && <span>{children}</span>}
    </div>
  );
};
export default Loader;
