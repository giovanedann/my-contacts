import { Route, Routes } from 'react-router-dom';
import { Home, NewContact } from './pages';
import EditContact from './pages/EditContact';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Routes>
  );
}
