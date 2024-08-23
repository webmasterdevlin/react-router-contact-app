import React from 'react';
import {
  Form,
  useLoaderData,
  useFetcher,
  LoaderFunctionArgs,
  ActionFunctionArgs,
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
    `Loader function (contactLoader) called at file src/routes/contact.tsx`
  );
  return contact;
}

export async function action({
  request,
  params,
}: ActionFunctionArgs): Promise<Contact> {
  const formData = await request.formData();
  console.log(
    `Action function (contactAction) called at file src/routes/contact.tsx`
  );
  return updateContact(params.contactId as string, {
    favorite: formData.get('favorite') === 'true',
  });
}

const ContactComponent: React.FC = () => {
  const contact = useLoaderData() as Contact;

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || 'https://ui-avatars.com/api/?name=no+name'}
          alt="avatar"
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noopener noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !globalThis.confirm(
                  'Please confirm you want to delete this record.'
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;

type FavoriteProps = {
  contact: Contact;
};

const Favorite: React.FC<FavoriteProps> = ({ contact }) => {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
};
