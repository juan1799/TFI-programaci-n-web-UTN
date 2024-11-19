const Student = require('../model/students');

class StudentService {
    static async create(data) {
        const lastSID = await Student.getLastSID();
        const newStudent = {
            ...data,
            sid: lastSID + 1
        };
        return await Student.create(newStudent);
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
