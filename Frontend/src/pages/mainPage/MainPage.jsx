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
          <h1 className='cursor-pointer text-center shadow-md py-10 text-4xl font-extrabold hover:bg-[rgb(237,245,252)]'>
            Módulo principal
          </h1>
        </NavLink>
      </div>
    </PageContent>
  );
};

export default MainPage;
