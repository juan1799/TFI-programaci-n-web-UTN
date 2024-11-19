const validateBody = (req, res, next) => {
  const { firstname, lastname, dni, email } = req.body;
  const errors = [];

  if (!firstname) {
      errors.push('El nombre es requerido');
  } else if (firstname.length > 100) {
      errors.push('El nombre no debe exceder los 100 caracteres');
  }

  if (!lastname) {
      errors.push('El apellido es requerido');
  } else if (lastname.length > 100) {
      errors.push('El apellido no debe exceder los 100 caracteres');
  }

  if (!dni) { 
      errors.push('El DNI es requerido');
  } else if (!/^\d{1,10}$/.test(dni)) {
      errors.push('El DNI debe contener solo números y hasta 10 dígitos');
  }

  if (!email) {
      errors.push('El email es requerido');
  } else if (email.length > 100) {
      errors.push('El email no debe exceder los 100 caracteres');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('El formato del email no es válido');
  }

  if (errors.length > 0) {
      return res.status(400).json({ errors });
  }

  next();
};

const validateById = (req, res, next) => {
  const id = Number(req.params.id);
  
  if (isNaN(id) || id <= 0) {
      return res.status(400).json({
          message: 'ID inválido'
      });
  }

  req.params.id = id;
  next();
};

const validatePaginationParams = (req, res, next) => {
  try {
      const { currentPage = 1, pageSize = 5, search = '' } = req.query;

      if (isNaN(currentPage) || isNaN(pageSize)) {
          return res.status(400).json({
              success: false,
              message: 'Los parámetros de paginación deben ser números'
          });
      }

      if (currentPage < 1 || pageSize < 1) {
          return res.status(400).json({
              success: false,
              message: 'Los parámetros de paginación deben ser mayores a 0'
          });
      }

      if (pageSize > 50) {
          return res.status(400).json({
              success: false,
              message: 'El tamaño de página no puede ser mayor a 50'
          });
      }

      req.query.search = search.trim();
      req.query.currentPage = parseInt(currentPage);
      req.query.pageSize = parseInt(pageSize);

      next();
  } catch (error) {
      next(error);
  }
};
const checkForDuplicates = async (req, res, next) => { 
  const { dni, email } = req.body; 
  const id = req.params.id ? Number(req.params.id) : null; 
  try { 
    const existingStudent = await Student.findOne({ where: { [Op.or]: [{ dni }, { email }], deleted: false, ...(id && { id: { [Op.ne]: id } })  } }); if (existingStudent) { return res.status(400).json({ 
      message: 'Ya existe un estudiante con el mismo DNI o Email' 
    }); 
  } next(); 
  }catch (error) { 
    next(error); 
  }};
module.exports = {
  validateBody,
  validateById,
  validatePaginationParams,
  checkForDuplicates
};
