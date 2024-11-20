import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormStudents from '../FormStudents/FormStudents';
import { getStudentById } from '../../../services/studentService';

const StudentManager = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getStudentById(id).then(data => setStudent(data));
    }
  }, [id]);

  const handleSuccess = () => {
    navigate('/students'); 
  };

  return (
    <div>
      <h1 className='flex items-center justify-between w-auto bg-aliceblue p-5 mb-0 text-3xl font-bold dark:bg-gray-600 dark:text-white'>
        {id ? 'Actualizar Estudiante' : 'Crear Estudiante'}
      </h1>
      <FormStudents student={student} onSuccess={handleSuccess} />
    </div>
  );
};

export default StudentManager;
