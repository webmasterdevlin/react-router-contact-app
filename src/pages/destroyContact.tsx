import { redirect, ActionFunctionArgs } from 'react-router-dom';
import { deleteContact } from '../services/contacts.ts';

export async function action({
  params,
}: ActionFunctionArgs): Promise<Response> {
  await deleteContact(params.contactId as string);
  console.log(
    `Action function (destroyAction) called at file src/pages/destroyContact.tsx`
  );
  return redirect('/');
}
