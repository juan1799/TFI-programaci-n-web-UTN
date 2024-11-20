import PageContent from "../../components/pageContent/PageContent";
import { NavLink } from "react-router-dom";

const MainPage = () => {

  return (
    <PageContent
      headerTitle='Página Principal'
    >
      <div>
        <NavLink
          to='/students'
        >
          <h1 className='cursor-pointer text-center shadow-lg dark:shadow-md py-10 text-4xl font-extrabold hover:bg-[rgb(237,245,252)] dark:hover:bg-gray-600'>
            Módulo principal
          </h1>
        </NavLink>
      </div>
    </PageContent>
  );
};

export default MainPage;
