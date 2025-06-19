import { parseWithZod } from '@conform-to/zod';
import { data } from 'react-router';
import type { z } from 'zod';

import { csrf } from '~/services/csrf.server';
import { requireUser } from './user.server';

interface ZodParsePublicFormProps<T extends z.ZodSchema> {
  request: Request;
  schema: T;
}
export const zodParsePublicForm = async <T extends z.ZodSchema>({ request, schema }: ZodParsePublicFormProps<T>) => {
  await csrf.validate(request);
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return {
      submission: undefined,
      errors: data(submission.reply(), {
        status: submission.status === 'error' ? 400 : 200
      })
    };
  }
  return { submission, errors: undefined };
};

type ZodParseForm<T extends z.ZodSchema> = ZodParsePublicFormProps<T>;
export const zodParseForm = async <T extends z.ZodSchema>({ request, schema }: ZodParseForm<T>) => {
  const user = await requireUser({ request });
  const submission = await zodParsePublicForm({ request, schema });
  return { ...submission, user };
};
