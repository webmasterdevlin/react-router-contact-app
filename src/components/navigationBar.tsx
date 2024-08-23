import { Link, useNavigate } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();
  // an example of react-router's non-typesafe route navigation
  // you can write any path you want without any type checking
  return (
    <div>
      <Link to="/where">Home</Link>
      <button onClick={() => navigate('/i-dont-exist')}>No Where</button>
    </div>
  );
}
