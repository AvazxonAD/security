const { WorkerService } = require('./service');
const { BatalonService } = require('../batalon/service');
const { Schema } = require('./schema');
const path = require('path');



exports.Controller = class {
    static async workerCreate(req, res) {
        const user_id = req.user.id
        const { fio, batalon_id, account_number, xisob_raqam } = req.body;

        if (batalon_id) {
            const batalon = await BatalonService.batalonGetById({ user_id, id: batalon_id })
            if (!batalon) {
                return res.error('Batalon not found', 404);
            }
        }
        const check1 = await WorkerService.workerGetByAccountNumber({ user_id, account_number });
        if (check1) {
            return res.error('This data already exists', 409);
        }

        const check2 = await WorkerService.workerGetByXisobRaqam({ user_id, xisob_raqam });
        if (check2) {
            return res.error('This data already exists', 409);
        }

        const check = await WorkerService.workerGetByFio({ user_id, fio });
        if (check) {
            return res.error('This data already exists', 409);
        }

        await WorkerService.workerCreate({ fio, batalon_id, account_number, xisob_raqam, user_id });

        return res.success('Create succesfully', 201);
    }

    static async workerGet(req, res) {
        const user_id = req.user.id
        const { page, limit, batalon_id, search } = req.query;
        const offset = (page - 1) * limit;

        const { data, total } = await WorkerService.workerGet({ user_id, search, batalon_id, offset, limit });

        const pageCount = Math.ceil(total / limit);

        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
        }

        res.success('Get successfully', 200, meta, data);
    }

    static async workerGetById(req, res) {
        const user_id = req.user.id;
        const id = req.params.id;

        const result = await WorkerService.workerGetById({ user_id, id, isdeleted: true });

        if (!result) {
            return res.error('Worker not found', 404);
        }

        return res.success('Get successfully', 200, null, result);
    }

    static async workerUpdate(req, res) {
        const user_id = req.user.id;
        const id = req.params.id
        const { fio, batalon_id, account_number, xisob_raqam } = req.body;

        const oldData = await WorkerService.workerGetById({ user_id, id });
        if (!oldData) {
            return res.error('Worker not found', 404);
        }

        if (batalon_id) {
            const batalon = await BatalonService.batalonGetById({ user_id, id: batalon_id })
            if (!batalon) {
                return res.error('Batalon not found', 404);
            }
        }

        if (oldData.account_number !== account_number) {
            const check = await WorkerService.workerGetByAccountNumber({ user_id, account_number });
            if (check) {
                return res.error('This data already exists', 409);
            }
        }

        if (oldData.xisob_raqam !== xisob_raqam) {
            const check = await WorkerService.workerGetByXisobRaqam({ user_id, xisob_raqam });
            if (check) {
                return res.error('This data already exists', 409);
            }
        }

        if (oldData.fio !== fio) {
            const check = await WorkerService.workerGetByFio({ user_id, fio });
            if (check) {
                return res.error('This data already exists', 409);
            }
        }


        await WorkerService.workerUpdate({ fio, batalon_id, account_number, xisob_raqam, id });

        return res.success('Update successfully', 200);
    }

    static async workerDelete(req, res) {
        const user_id = req.user.id
        const id = req.params.id

        const worker = await WorkerService.workerGetById({ user_id, id });
        if (!worker) {
            return res.error('Worker not found', 404);
        }

        await WorkerService.workerDelete({ id });

        return res.success('Delete successfully', 200);
    }

    static async exportExcel(req, res) {

        const user_id = req.user.id;
        const { search, batalon_id } = req.query;

        if (batalon_id) {
            const batalon = await BatalonService.batalonGetById({ user_id, id: batalon_id });
            if (!batalon) {
                return res.error('Batalon not found', 404);
            }
        }

        const result = await WorkerService.workerGet({ user_id, search, batalon_id, offset: 0, limit: 100000 });

        const { fileName, filePath } = await WorkerService.exportExcel(result);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        return res.sendFile(filePath);
    }

    static async importData(req, res) {
        const user_id = req.user.id
        if (!req.file) {
            return res.error('File not found', 404);
        }

        const data = await WorkerService.readFile({ filePath: req.file.path });
        for (let worker of data) {
            let batalon;

            const { Batalon, Karta_raqam, FIO, Xisob_raqam } = worker;

            if (Batalon) {
                batalon = await BatalonService.batalonGetByName({ user_id, name: Batalon });
                if (!batalon) {
                    return res.error("Batalon not found", 404);
                }
            }

            // if (Karta_raqam) {
            //     const check = await WorkerService.workerGetByAccountNumber({ user_id, account_number: Karta_raqam });
            //     if (check) {
            //         return res.error('This data already exists', 409);
            //     }
            // }

            // if (Xisob_raqam) {
            //     const check = await WorkerService.workerGetByXisobRaqam({ user_id, xisob_raqam: Xisob_raqam });
            //     if (check) {
            //         return res.error('This data already exists', 409);
            //     }
            // }

            // if (FIO) {
            //     const check = await WorkerService.workerGetByFio({ user_id, fio: FIO });
            //     if (check) {
            //         return res.error('This data already exists', 409);
            //     }
            // }

            if (FIO.toLowerCase() === 'вакант') {
                continue
            }

            await WorkerService.workerCreate({ batalon_id: batalon?.id, account_number: Karta_raqam, fio: FIO, xisob_raqam: Xisob_raqam, user_id });
        }
        return res.success('Import data successfully', 201);
    }

    static async WorkerTemplate(req, res) {
        const filePath = path.join(__dirname, '../../public/template/workers.template.xlsx')

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="workers.template.xlsx"');

        return res.sendFile(filePath);
    }
};