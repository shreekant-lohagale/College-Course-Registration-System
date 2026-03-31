const Insurance = require('../models/Insurance');

// @desc    Get all insurance records for logged in user
// @route   GET /api/insurance
// @access  Private
exports.getInsuranceRecords = async (req, res) => {
  try {
    const records = await Insurance.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new insurance record
// @route   POST /api/insurance
// @access  Private
exports.addInsuranceRecord = async (req, res) => {
  const { age, sex, bmi, children, smoker, region, charges } = req.body;

  try {
    const newRecord = new Insurance({
      age,
      sex,
      bmi,
      children,
      smoker,
      region,
      charges,
      user: req.user.id,
    });

    const record = await newRecord.save();
    res.json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Delete insurance record
// @route   DELETE /api/insurance/:id
// @access  Private
exports.deleteInsuranceRecord = async (req, res) => {
  try {
    const record = await Insurance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ msg: 'Record not found' });
    }

    // Make sure user owns record
    if (record.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await record.deleteOne();

    res.json({ msg: 'Record removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
