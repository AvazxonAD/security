const { MonitoringDB } = require("./db");

exports.MonitoringService = class {
  static async get(data) {
    const docs = await MonitoringDB.getDocs([
      data.user_id,
      data.account_number_id,
      data.from,
      data.to,
      data.offset,
      data.limit,
    ]);

    const from_summa = await MonitoringDB.getSumma(
      [data.user_id, data.account_number_id],
      data.from
    );

    const to_summa = await MonitoringDB.getSumma(
      [data.user_id, data.account_number_id],
      data.to
    );

    const internal_summa = await MonitoringDB.getSumma(
      [data.user_id, data.account_number_id],
      data.from,
      data.to
    );

    return { docs, from_summa, to_summa, internal_summa };
  }
};
