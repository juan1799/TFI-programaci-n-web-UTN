const express = require('express');
const StudentService = require('../services/studentsServices');
const { validateById, validateBody, validatePaginationParams, validateDuplicates} = require('../middleware/studentsMiddleware');

const router = express.Router();
router.get('/', validatePaginationParams, async (req, res) => {
    try {
        const { search = '', currentPage = 1, pageSize = 5 } = req.query;
        
        const result = await StudentService.getPaginated(
            search,
            currentPage,
            pageSize
        );

        res.json(result);
    } catch (error) {
        console.error('Error en ruta de paginación:', error);
        res.status(500).json({
            message: 'Error al obtener estudiantes',
            error: error.message
        });
    }
});

router.post('/', validateBody/* ,validateDuplicates*/, async (req, res, next) => {
    try {
        const newStudent = await StudentService.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        if (error.statusCode === 409) {
            return res.status(409).json({ message: error.message });
        }
        next(error);
    }
});

router.put('/:id', validateById, validateBody, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await StudentService.updateStudent(id, updateData);
        if (result > 0) { 
            res.json({ message: 'Estudiante actualizado exitosamente' });
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado o ya eliminado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

router.delete('/:id', validateById, async (req, res, next) => {
    try {
        const { id } = req.params;
        await StudentService.deleteStudent(id);
        
        res.json({
            success: true,
            message: 'Estudiante eliminado correctamente'
        });
    } catch (error) {
        if (error.message === 'Estudiante no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        next(error);
    }
});
router.get('/:id', validateById, async (req, res) => { 
    const { id } = req.params; 
    try { 
        const student = await StudentService.getStudentById(id); 
        if (student) { 
            res.json(student); 
        } else { 
            res.status(404).json({ message: 'Estudiante no encontrado' }); 
        } } 
    catch (error) { 
        res.status(500).json({ message: 'Error en el servidor', error: error.message }); 
    } 
});

module.exports = router;
