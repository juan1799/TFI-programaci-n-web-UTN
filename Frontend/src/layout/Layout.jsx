import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='h-screen flex'>
      <div className='w-52 bg-darkturquoise py-5 pl-5 shadow-md'>
        <h2 className='mb-12 text-2xl font-bold'>
          Trabajo Practico Integrador
        </h2>
        <nav className='overflow-hidden'>
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? 'w-full py-1.5 flex rounded-tl-md list-none text-black bg-white font-bold shadow-md pl-5' : 'w-full py-1.5 flex rounded-tl-md list-none text-black hover:bg-paleturquoise'
                }
              >
                Página Principal
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/students'
                className={({ isActive }) =>
                  isActive ? 'w-full py-1.5 flex rounded-tl-md list-none text-black bg-white font-bold shadow-md pl-5' : 'w-full py-1.5 flex rounded-tl-md list-none text-black hover:bg-paleturquoise'
                }
              >
                Alumnos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
