import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { getContact, updateContact } from '../services/contacts.ts';
import { Contact } from '../models.ts';

export async function loader({ params }: LoaderFunctionArgs): Promise<Contact> {
  const contact = await getContact(params.contactId as string);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  console.log(
    `Loader function (contactLoader) called at file src/pages/editContact.tsx`
  );
  return contact;
}

export async function action({
  request,
  params,
}: ActionFunctionArgs): Promise<Response> {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId as string, updates);
  console.log(
    `Action function (editAction) called at file src/routes/editContact.tsx`
  );
  return redirect(`/contacts/${params.contactId}`);
}

const EditContact = () => {
  const contact = useLoaderData() as Contact;
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  );
};
export default EditContact;
