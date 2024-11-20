import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContent from "../../../components/pageContent/PageContent";

const ListStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [deletingStudents, setDeletingStudents] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);

  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [itemPerPage, currentPage]);

  const fetchStudents = async () => {
    try {
      setFetchingStudents(true);
      const response = await fetch(`/api/students?search=${searchText}&currentPage=${currentPage}&pageSize=${itemPerPage}`, {
        method: 'GET'
      });

      const data = await response.json();
      setStudents(data.students || []); 
      setTotalStudents(data.total || 0);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setFetchingStudents(false);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalStudents / itemPerPage);
    let paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(<button key={i} className={`shadow-sm text-white py-2 px-4 rounded-md cursor-pointer border-none bg-darkturquoise hover:bg-paleturquoise ${i === currentPage ? 'bg-[rgb(1,120,122)]' : ''}`} onClick={() => setCurrentPage(i)}>{i}</button>);
    }
    return paginationButtons;
  };

  const onHandleDeleteConfirm = async (student) => {
    if (confirm(`Desea eliminar el estudiante: ${student.sid} - ${student.firstname} ${student.lastname}`)) {
      await onDeleteStudent(student);
    }
    fetchStudents();
  };

  const handleOnSearch = () => {
    setCurrentPage(1);
    fetchStudents();
  };

  const onDeleteStudent = async (student) => {
    try {
      setDeletingStudents(false);
      await fetch(`api/students/${student.id}`, {
        method: 'DELETE'
      });
      setSearchText('');
      setItemPerPage(5);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setDeletingStudents(false);
    }
  };

  const navigateToUpdate = (studentId) => {
    navigate(`/students/form/${studentId}`);
  };

  return (
    <PageContent
      headerTitle='Alumnos'
      actions={[
        <button className='bg-darkturquoise shadow-sm text-white py-2 px-4 rounded-md cursor-pointer border-none hover:bg-paleturquoise' key='add' onClick={() => navigate('/students/form')}>Agregar</button>
      ]}
    >
      {
        fetchingStudents
          ? <p>Por favor espere, recuperando información...</p>
          : <>
            {
              deletingStudents && <span>Borrando estudiante...</span>
            }
            <div className='flex flex-col gap-4 p-5'>
              <div className='flex gap-4'>
                <input type='text' className='h-10 border rounded-md px-2 dark:text-black' placeholder='Buscar por apellido' value={searchText} onChange={e => setSearchText(e.target.value)} />
                <button className='bg-darkturquoise shadow-sm text-white py-2 px-4 rounded-md cursor-pointer border-none hover:bg-paleturquoise' onClick={() => handleOnSearch()}>Buscar</button>
              </div>

              <table className='w-full border border-gray-300 border-collapse'>
                <thead>
                  <tr>
                    <th className='border border-gray-300 p-2'>Legajo</th>
                    <th className='border border-gray-300 p-2'>Nombre</th>
                    <th className='border border-gray-300 p-2'>Apellido</th>
                    <th className='border border-gray-300 p-2'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    students.length > 0 ? students.map(student => (
                      <tr key={student.sid}>
                        <td className='border border-gray-300 p-2'> {student.sid} </td>
                        <td className='border border-gray-300 p-2'> {student.firstname} </td>
                        <td className='border border-gray-300 p-2'> {student.lastname} </td>
                        <td className='border border-gray-300 p-2 text-center'>
                          <button className='ml-4 bg-red-500 shadow-sm text-white py-1 px-3 rounded-md cursor-pointer border-none hover:bg-[rgb(181,0,0)]' onClick={() => onHandleDeleteConfirm(student)}>Eliminar</button>
                          <button className='ml-4 bg-darkturquoise shadow-sm text-white py-1 px-3 rounded-md cursor-pointer border-none hover:bg-paleturquoise' onClick={() => navigateToUpdate(student.id)}>Actualizar</button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan='4' className='border border-gray-300 p-2'>No se encontraron estudiantes</td></tr>
                  }
                </tbody>
              </table>
              <div className='flex justify-end mt-2 items-center gap-2'>
                <label htmlFor='itemsPerPage'>Total: {totalStudents} - Items por página: </label>
                <select id='itemsPerPage' className='border rounded-md p-1 dark:text-black' value={itemPerPage} onChange={e => { setCurrentPage(1); setItemPerPage(e.target.value); }}>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                </select>

                <div className='flex gap-2' id='paginationControl'>
                  {renderPagination()}
                </div>
              </div>
            </div>
          </>
      }
    </PageContent>
  );
};

export default ListStudents;
