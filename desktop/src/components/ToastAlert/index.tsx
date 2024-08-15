import { TriangleAlert, CircleCheck } from 'lucide-react';
import React, { CSSProperties, ReactNode } from 'react';
import { toast } from 'sonner';

type TypeProps = 'success' | 'warning';

interface ToastAlertProps {
  content: string;
  type: TypeProps;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ content, type }) => {
  type TypeProps = 'success' | 'warning';

  const icon: Record<TypeProps, ReactNode> = {
    success: <TriangleAlert size={16} />,
    warning: <CircleCheck size={16} />,
  };

  const styles: Record<TypeProps, CSSProperties> = {
    success: { background: '#10b981', color: '#fff' },
    warning: { background: '#dc2626', color: '#fff' },
  };

  return toast(content, { icon: icon[type], style: styles[type] });
};

export default ToastAlert;
