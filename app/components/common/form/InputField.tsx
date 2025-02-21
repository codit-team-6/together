import {FieldValues, Path, UseFormRegister} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  isPassword?: boolean;
}

function InputField<T extends FieldValues>({
  label,
  name,
  placeholder = '',
  register,
  errorMessage = '',
  isPassword = false,
}: InputFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        className={`w-full border bg-gray-50 px-3 py-2 ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 ${
          errorMessage ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

InputField.defaultProps = {
  placeholder: '',
  errorMessage: '',
  isPassword: false,
};

export default InputField;
