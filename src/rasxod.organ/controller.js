const { OrganizationService } = require('../organization/service');
const { AccountNumberService } = require('../spravochnik/account.number/service');
const { RasxodOrganService } = require('./service');
const { Functions } = require('../helper/functions');

exports.Controller = class {
    static async create(req, res) {
        const account_number_id = req.query.account_number_id;
        const user_id = req.user.id;

        const { organ_id } = req.body;

        const organ = await OrganizationService.getById({ user_id, id: organ_id });
        if (!organ) {
            return res.error(req.i18.t('organizationNotFound'), 404);
        }

        const account_number = await AccountNumberService.getById({ user_id, id: account_number_id });
        if (account_number) {
            return res.error(req.i18.t('accountNumberError'), 404);
        }

        const result = await RasxodOrganService.create({ ...req.body, user_id, account_number_id });

        return result;
    }

    static async get(req, res) {
        const { account_number_id, page, limit, search, from, to } = req.query.account_number_id;
        const user_id = req.user.id;

        const account_number = await AccountNumberService.getById({ user_id, id: account_number_id });
        if (account_number) {
            return res.error(req.i18.t('accountNumberError'), 404);
        }

        const offset = (page - 1) * limit;

        const { from_balance, to_balance, summa, total_count, data } = await RasxodOrganService.get({ limit, search, from, to, account_number_id, offset });

        const pageCount = Math.ceil(total_count);

        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: Functions.stringSumma(from_balance || 0),
            to_balance: Functions.stringSumma(to_balance || 0),
            summa: Functions.stringSumma(summa)
        };

        return res.success(req.i18.t('getSuccess'), 200, meta, data);
    }

    static async getById(req, res) {
        const user_id = req.user.id;
        const id = req.params.id;

        const result = await RasxodOrganService.getById({ id, user_id });
        if (!result) {
            return res.error(req.i18.t('docNotFound'), 404);
        }

        return res.success(req.i18.t('getSuccess'), 200, null, result);
    }

    static async update(req, res) {
        const account_number_id = req.query.account_number_id;
        const user_id = req.user.id;
        const id = req.params.id;
        const { organ_id } = req.body;

        const oldData = await RasxodOrganService.getById({ user_id, id });
        if (!oldData) {
            return res.error(req.i18.t('docNotFound'), 404);
        }

        const organ = await OrganizationService.getById({ user_id, id: organ_id });
        if (!organ) {
            return res.error(req.i18.t('organizationNotFound'), 404);
        }

        const account_number = await AccountNumberService.getById({ user_id, id: account_number_id });
        if (account_number) {
            return res.error(req.i18.t('accountNumberError'), 404);
        }

        const result = await RasxodOrganService.update({ ...req.body, user_id, account_number_id, id });

        return result;
    }

    static async delete(req, res) {
        const user_id = req.user.id;
        const id = req.params.id;

        const data = await RasxodOrganService.getById({ id, user_id });
        if (!data) {
            return res.error(req.i18.t('docNotFound'), 404);
        }

        const result = await RasxodOrganService.delete({ id });

        return res.success(req.i18.t('deleteSuccess'), 200, null, result);
    }
}