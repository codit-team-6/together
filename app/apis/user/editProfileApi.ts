import {CodeitError} from '../../types/error.types';
import {clientInstance} from '../client';

export async function editProfile(formData: FormData): Promise<void> {
  try {
    await clientInstance.put({
      path: '/route/token/auths/editProfile',
      body: formData,
      contentType: 'formData',
    });
  } catch (error) {
    if (error instanceof CodeitError) {
      throw new CodeitError(error.message, error.status, error.code, error.parameter);
    }
    throw error;
  }
}
