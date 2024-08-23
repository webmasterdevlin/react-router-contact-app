import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, {
  action as rootAction,
  loader as rootLoader,
} from './pages/root.tsx';
import ErrorPage from './components/errorPage.tsx';
import Index from './pages';
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from './pages/contact.tsx';
import EditContact, {
  action as editAction,
  loader as editLoader,
} from './pages/editContact.tsx';
import { action as destroyAction } from './pages/destroyContact.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { element: <Index />, index: true },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            errorElement: <div>Oops! there was an error</div>,
            action: destroyAction,
          },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={routes} />;
}
