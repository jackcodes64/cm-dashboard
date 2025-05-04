const { Newsletters } = require('../models');

exports.getAllNewsletter = async (req, res) => {
 
  try {
    console.log("we are debugging newsletterController");
    const newsletter = await Newsletters.findAll({
      order: [['createdAt', 'DESC']], 
    });
    res.json(newsletter);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving newsletter sign-ups', error: err });
  }
};

exports.createNewsletter = async (req, res) => {
  try {
    const { email } = req.body; 

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newsletter = await Newsletters.create({
      email, 
    });

    res.json(newsletter);
  } catch (err) {
    res.status(500).json({ message: 'Error creating email', error: err });
  }
};

exports.deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await Newsletters.findByPk(id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found.' });
    }

    await subscriber.destroy();
    res.json({ message: 'Subscriber deleted successfully.' });
  } catch (err) {
    console.error('Error deleting subscriber:', err);
    res.status(500).json({ message: 'Error deleting subscriber', error: err });
  }
};
