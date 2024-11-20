import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContent from '../../../components/pageContent/PageContent';
import { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../../../services/studentService';
import PropTypes from 'prop-types';

const defaultValues = {
  inputNameValue: '',
  inputLastNameValue: '',
  inputDNIValue: '',
  inputEmailValue: ''
};

const FormStudents = ({ student }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (student) {
      setValue('inputNameValue', student.firstname);
      setValue('inputLastNameValue', student.lastname);
      setValue('inputDNIValue', student.dni);
      setValue('inputEmailValue', student.email);
    } else {
      reset(defaultValues);
    }
  }, [student, setValue, reset]);

  const onSubmit = async (formData) => {
    try {
      const body = {
        firstname: formData.inputNameValue,
        lastname: formData.inputLastNameValue,
        dni: Number(formData.inputDNIValue),
        email: formData.inputEmailValue
      };

      if (id) {
        await updateStudent(id, body);
        setSuccessMessage('Alumno actualizado exitosamente');
      } else {
        await createStudent(body);
        reset(defaultValues);
        setSuccessMessage('Alumno agregado exitosamente'); 
      }
      setTimeout(() => setSuccessMessage(''), 3500);
      setTimeout(() => navigate('/students'), 3500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('No se puede agregar ya que existe un alumno con ese email o DNI');
      } else {
        setErrorMessage(error.response?.data?.message || 'Error al guardar el estudiante');
      }
      setTimeout(() => setErrorMessage(''), 3500);
    }
  };


  return (
    <PageContent
      headerTitle='Formulario'
      actions={ [
        <button className='bg-red-500 shadow-sm text-white py-2 px-4 rounded-md cursor-pointer border-none hover:bg-[rgb(181,0,0)]' key='back' onClick={ () => navigate(-1) }>Atras</button>
      ] }
    >
      <div className='p-5'>
        <form className='p-5 shadow-md dark:text-black' onSubmit={ handleSubmit(onSubmit) }>
          <div className='grid grid-cols-1fr-1fr gap-4 mb-4'>
            <div>
              <label className='dark:text-white'>Nombre:</label>
              <input className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md' {...register('inputNameValue', { 
                required: 'Nombre es requerido',
                maxLength: {
                  value: 100,
                  message: 'Nombre no puede ser mayor a 100 caracteres'
                },
                pattern: { 
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El nombre solo debe contener letras'
                }
              })} />
              <p className='text-red-500 font-bold'>{errors.inputNameValue?.message}</p>
            </div>

            <div>
              <label  className='dark:text-white'>Apellido:</label>
              <input className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md' {...register('inputLastNameValue', { 
                required: 'Apellido es requerido',
                maxLength: {
                  value: 100,
                  message: 'Apellido no puede ser mayor a 100 caracteres'
                },
                pattern: { 
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El Apellido solo debe contener letras'
                }
              })} />
              <p className='text-red-500 font-bold'>{errors.inputLastNameValue?.message}</p>
            </div>

            <div>
              <label  className='dark:text-white'>DNI:</label>
              <input className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md' {...register('inputDNIValue', { 
                required: 'DNI es requerido',
                maxLength: {
                  value: 10,
                  message: 'DNI no puede ser mayor a 10 dígitos'
                },
                pattern: { 
                  value: /^[0-9]{1,10}$/, 
                  message: 'DNI debe ser un número de hasta 10 dígitos' 
                }
              })} />
              <p className='text-red-500 font-bold'>{errors.inputDNIValue?.message}</p>
            </div>

            <div>
              <label  className='dark:text-white'>Email:</label>
              <input className='w-full mt-1 px-3 py-2 border border-gray-300 rounded-md' {...register('inputEmailValue', { 
                required: 'Email es requerido',
                maxLength: {
                  value: 100,
                  message: 'Email no puede ser mayor a 100 caracteres'
                },
                pattern: { 
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'El formato del email no es válido'
                }
              })} />
              <p className='text-red-500 font-bold'>{errors.inputEmailValue?.message}</p>
            </div>
          </div>
          <button className='bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600' type='submit'>
            {id ? 'Actualizar' : 'Agregar'}
          </button>
        </form>
        {successMessage && <p className='text-green-500 text-lg font-bold mt-4'>{successMessage}</p>}
        {errorMessage && <p className='text-red-500 dark:text-red-400 text-lg font-bold mt-4'>{errorMessage}</p>}
      </div>
    </PageContent>
  );
};


FormStudents.propTypes = {
  student: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    dni: PropTypes.number,
    email: PropTypes.string
  }),
  onSuccess: PropTypes.func.isRequired
};

export default FormStudents;
