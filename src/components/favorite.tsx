import { Contact } from '../models.ts';
import React from 'react';
import { useFetcher } from 'react-router-dom';

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

export default Favorite;
