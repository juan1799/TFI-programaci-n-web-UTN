import PropTypes from 'prop-types';

const PageContent = ({ children, headerTitle = '', actions = [] }) => {
  return (
    <div className='h-full'>
      <header className='flex items-center justify-between w-auto bg-aliceblue shadow-md p-5'>
        <h2 className='text-2xl font-bold'>
          {headerTitle}
        </h2>
        <div className='flex space-x-2'>
          {[...actions]}
        </div>
      </header>
      <main className='p-5'>
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
