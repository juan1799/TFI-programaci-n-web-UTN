import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './layout/Layout.jsx';
import MainPage from './pages/mainPage/MainPage.jsx';

import StudentManager from './pages/students/studentsManager/studentsManager.jsx';
import ListStudents from './pages/students/listStudents/ListStudents.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/students',
        element: <ListStudents />
      },
      {
        path: '/students/form',
        element: <StudentManager />
      },
      {
        path: '/students/form/:id',
        element: <StudentManager />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
);
