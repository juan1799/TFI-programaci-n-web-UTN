import PropTypes from 'prop-types';

const PageContent = ({ children, headerTitle = '', actions = [] }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex items-center justify-between w-auto bg-aliceblue dark:bg-gray-600 shadow-md dark:shadow-lg dark:shadow-gray-500/50 p-5'>
        <h2 className='text-2xl font-bold text-black dark:text-white'>
          {headerTitle}
        </h2>
        <div className='flex space-x-2'>
          {[...actions]}
        </div>
      </header>
      <main className='flex-grow p-5 bg-white dark:bg-gray-700 text-black dark:text-white'>
        {children}
      </main>
    </div>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  headerTitle: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.element),
};

export default PageContent;
