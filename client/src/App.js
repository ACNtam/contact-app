import AddContact from "./components/AddContact";
import ViewContact from "./components/ViewContact"
import ContactList from './components/ContactList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import EditContact from "./components/EditContact";

function App() {

  return (
    <BrowserRouter className="App">
      <Routes >
        <Route path='/' element={<Layout />}>
          <Route path='/view/:id' element={<ViewContact />} />
          <Route path='/add' element={<AddContact />} />
          <Route path='/edit' element={<EditContact />} />
          <Route index element={<ContactList/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

