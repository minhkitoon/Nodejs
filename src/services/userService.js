const { User } = require('../models/user.model'); // Giả sử bạn đã export model từ file này

async function getListUsers(page, pageSize) {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const { count, rows } = await User.findAndCountAll({
    offset: offset,
    limit: limit,
    order: [['id', 'ASC']]
  });

  return {
    data: rows,
    pagination: {
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSize)
    }
  };
}

module.exports = {
  getListUsers
};