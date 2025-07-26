import { useState, ChangeEvent } from 'react';

// フックの戻り値の型を定義
interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
}

// ジェネリックなフックを作成し、様々なフォームで再利用可能にする
export const useForm = <T extends object>(
  initialValues: T,
  validate: (values: T) => Partial<Record<keyof T, string>>
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    values,errors,handleChange,validateForm,
  };
}
