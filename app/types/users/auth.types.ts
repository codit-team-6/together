import {z} from 'zod';

import {LoginSchema} from '../../utils/validation';

// login types
export type LoginInputsType = z.infer<typeof LoginSchema>;

export type SignupData = {
  name: string;
  email: string;
  companyName: string;
  password: string;
};
