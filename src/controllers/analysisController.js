const { exec } = require('child_process');
const path = require('path');

// @desc    Run the insurance ML analysis script
// @route   GET /api/insurance/analyze
// @access  Private
exports.analyzeInsurance = async (req, res) => {
  // Use 'python' or 'python3' depending on the environment
  const scriptPath = path.join(__dirname, '..', '..', 'insurance', 'insurance_analysis.py');
  const pythonCmd = process.env.PYTHON_CMD || 'python3';
  const cmd = `${pythonCmd} "${scriptPath}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ msg: 'Machine Learning analysis failed to execute.', error: error.message });
    }

    // Parse the output to extract R2 scores and conclusion
    const lines = stdout.split('\n');
    let results = {
      linear_regression: { mse: null, r2: null },
      random_forest: { mse: null, r2: null },
      conclusion: ""
    };

    lines.forEach(line => {
      if (line.includes('Linear Regression ->')) {
        const parts = line.split(':');
        results.linear_regression.mse = parts[1].split(',')[0].trim();
        results.linear_regression.r2 = parts[2].trim();
      }
      if (line.includes('Random Forest     ->')) {
        const parts = line.split(':');
        results.random_forest.mse = parts[1].split(',')[0].trim();
        results.random_forest.r2 = parts[2].trim();
      }
      if (line.startsWith('The Random Forest') || line.startsWith('Linear Regression performed')) {
        results.conclusion = line.trim();
      }
    });

    res.json({
      success: true,
      data: results,
      raw_output: stdout.slice(-500) // Send a snippet of raw output for flavor
    });
  });
};
