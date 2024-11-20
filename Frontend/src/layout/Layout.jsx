import { Outlet, NavLink } from 'react-router-dom';
import ToggleDarkMode from '../components/pageContent/toggleDarkMode';

const Layout = () => {
  return (
    <div className='h-screen flex'>
      <div className='w-52 bg-darkturquoise dark:bg-[#0fa1a4] py-5 pl-5 shadow-md dark:shadow-lg flex flex-col justify-between'>
        <div>
          <h2 className='mb-12 text-2xl font-bold text-black dark:text-white'>
            Trabajo Practico Integrador
          </h2>
          <nav className='mt-5 overflow-hidden'>
            <ul>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? 'w-full py-1.5 flex rounded-tl-md list-none text-black dark:text-white bg-gray-100 dark:bg-gray-700 font-bold shadow-md dark:shadow-inner pl-5 hover:bg-gray-200 dark:hover:bg-gray-700' : 'w-full py-1.5 flex rounded-tl-md list-none text-black dark:text-white hover:bg-paleturquoise dark:hover:bg-[#006666]'
                  }
                >
                  Página Principal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/students'
                  className={({ isActive }) =>
                    isActive ? 'w-full py-1.5 flex rounded-tl-md list-none text-black dark:text-white bg-gray-100 dark:bg-gray-700 font-bold shadow-md dark:shadow-inner pl-5 hover:bg-gray-200 dark:hover:bg-gray-700' : 'w-full py-1.5 flex rounded-tl-md list-none text-black dark:text-white hover:bg-paleturquoise dark:hover:bg-[#006666]'
                  }
                >
                  Alumnos
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='pb-5'>
          <ToggleDarkMode />
        </div>
      </div>
      <div className='flex-1 bg-gray-100 dark:bg-gray-600 text-black dark:text-white'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

