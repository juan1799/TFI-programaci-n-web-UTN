import { useEffect, useState } from 'react';


const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className='flex flex-col items-center'>
      <label className='text-black dark:text-white mb-2'>
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        {isDarkMode ? (
          <i className='bi bi-sun ml-2'></i>
        ) : (
          <i className='bi bi-moon ml-2'></i>
        )}
      </label>
      <div className='relative inline-block w-12 h-6 mr-2 align-middle select-none transition duration-200 ease-in'>
        <input
          type='checkbox'
          name='toggle'
          id='toggle'
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
        />
        <label
          htmlFor='toggle'
          className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 dark:bg-gray-600 cursor-pointer'
        />
      </div>
    </div>
  );
};

export default ToggleDarkMode;
