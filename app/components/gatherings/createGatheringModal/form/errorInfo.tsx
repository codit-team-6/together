type ErrorInfoProps = {
  type: string;
  message: string;
};

export default function ErrorInfo({type, message}: ErrorInfoProps) {
  console.log(type);
  return message && <span className="mt-1 text-sm text-red-500">{message}</span>;
}
