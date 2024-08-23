import './styles/index.css';
import Index from './routes/index';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/errorPage';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';
import EditContact, {
  loader as editLoader,
  action as editAction,
} from './routes/editContact';
import { action as destroyAction } from './routes/destroyContact';

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
