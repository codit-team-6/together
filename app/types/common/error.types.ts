// login Error
type CodeitErrorMessage = string;
type CodeitErrorCode = string;
export type CodeitErrorStatus = number;
type CodeitErrorParameter = string;

export class CodeitError extends Error {
  constructor(
    public message: CodeitErrorMessage,
    public status: CodeitErrorStatus,
    public code?: CodeitErrorCode,
    public parameter?: CodeitErrorParameter,
  ) {
    super(message);

    this.message = message;
    this.status = status;
    this.code = code;
    this.parameter = parameter;
  }
}
