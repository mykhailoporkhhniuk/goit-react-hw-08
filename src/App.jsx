import './App.css'

import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Layout from './components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';

const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'))

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>User is refreshing, please wait...</p>;
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<PrivateRoute component={<ContactsPage />} />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage />} />} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App
