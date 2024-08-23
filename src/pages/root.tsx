import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  LoaderFunctionArgs,
} from 'react-router-dom';
import { getContacts, createContact } from '../services/contacts.ts';
import { useEffect } from 'react';
import { Contact } from '../models.ts';

type LoaderData = {
  contacts: Contact[];
  q: string | null;
};

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = (await getContacts(q || '')) as Contact[];
  console.log(`Loader function (rootLoader) called at file src/pages/root.tsx`);
  return { contacts, q };
}

export async function action(): Promise<Response> {
  const contact = await createContact();
  console.log(`Action function (rootAction) called at file src/pages/root.tsx`);
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    (document.getElementById('q') as HTMLInputElement).value = q || '';
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>Tutorial by React Router</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q || ''}
              onChange={(e) => {
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
