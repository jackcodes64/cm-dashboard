const { ErrorLog } = require('../models');

exports.getAllErrors = async (req, res) => {

  try {
    const errors = await ErrorLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50,
      where: { resolved: false }
    });
    res.json(errors);
  } catch (err) {
    console.error('Failed to fetch errors:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

exports.updateErrors = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolved } = req.body;

    const error = await ErrorLog.findByPk(id);
    if (!error) {
      return res.status(404).json({ message: 'Bug not found.' });
    }

    await error.update({ resolved });
    res.json({ message: 'Error updated successfully.', error });
  } catch (err) {
    console.error('Error updating error:', err);
    res.status(500).json({ message: 'Error updating error', error: err });
  }
};
