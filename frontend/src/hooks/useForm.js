import { useState } from 'react';

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // Verifica se é um evento nativo ou um objeto customizado
    const { name, value } = e.target ? e.target : {
      name: e.name,
      value: e.value
    };

    setValues(prev => ({ ...prev, [name]: value }));

    if (validationSchema[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validationSchema[name](value, values)
      }));
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const newErrors = Object.entries(values).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: validationSchema[key]?.(value, values)
    }), {});

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};
