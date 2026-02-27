import type { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
}) => {
  return (
    <label className="form-field">
      {children}
    </label>
  );
};
