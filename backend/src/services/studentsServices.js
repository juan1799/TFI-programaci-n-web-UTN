const Student = require('../model/students');

class StudentService {

    static async create(studentData) {
        try {
            const lastSid = await Student.getLastSID();
            const newSid = lastSid + 1;
    
            const existingStudent = await Student.findByDniOrEmail(
                studentData.dni,
                studentData.email
            );
    
            if (existingStudent) {
                const error = new Error('Ya existe un estudiante con ese DNI o email');
                error.statusCode = 409; 
                throw error;
            }
    
            return await Student.create({
                ...studentData,
                sid: newSid,
                deleted: false
            });
        } catch (error) {
            console.error('Error en create:', error);
            throw error;
        }
    }
    

    static async deleteStudent(id) {
        const student = await Student.findByPk(id);
        if (!student || student.deleted) {
            throw new Error('Estudiante no encontrado');
        }
        await Student.softDelete(id);
    }

    static async getPaginated(search, currentPage, pageSize) {
        const { rows, count } = await Student.findAllWithPagination(search, currentPage, pageSize);
        return {
            students: rows,
            total: count,
            currentPage,
            pageSize
        };
    }

    static async updateStudent(id, updateData) {
        const [updatedRows] = await Student.update(updateData, {
            where: { id, deleted: false }
        });
        if (updatedRows === 0) {
            throw new Error('Estudiante no encontrado o ya eliminado');
        }
        return updatedRows;
    }

    static async getStudentById(id) {
        return await Student.findOne({
            where: { id, deleted: false },
            attributes: { exclude: ['deleted', 'createdAt', 'updatedAt'] }
        });
    }
}

module.exports = StudentService;
