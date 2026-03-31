const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection URI from .env
const MONGO_URI = process.env.MONGODB_URI;

// 1. Define Course Schema
const CourseSchema = new mongoose.Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: { type: String, required: true },
  credits: { type: Number, required: true },
  faculty: { type: String, required: true },
  semester: { type: Number, required: true },
});

const Course = mongoose.model('AssignmentCourse', CourseSchema);

async function runAssignment() {
  try {
    // Connect to MongoDB
    console.log('--- PART 1: MongoDB CRUD Operations ---');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas...');

    // Clear existing data for demonstration
    await Course.deleteMany({});

    // 2. INSERT: Sample Data (at least 5 records)
    const sampleCourses = [
      { course_id: 'CS101', course_name: 'Introduction to Programming', credits: 4, faculty: 'Dr. John Smith', semester: 1 },
      { course_id: 'MAT201', course_name: 'Discrete Mathematics', credits: 3, faculty: 'Prof. Alice Green', semester: 2 },
      { course_id: 'ENG102', course_name: 'Business Communication', credits: 2, faculty: 'Dr. Sarah Brown', semester: 1 },
      { course_id: 'CS301', course_name: 'Database Management Systems', credits: 4, faculty: 'Prof. Mike Ross', semester: 3 },
      { course_id: 'PHY101', course_name: 'Engineering Physics', credits: 4, faculty: 'Dr. Robert White', semester: 1 },
    ];

    const insertedCourses = await Course.insertMany(sampleCourses);
    console.log(`\n[INSERT] Successfully inserted ${insertedCourses.length} courses.`);

    // 3. FIND: Get all courses
    const allCourses = await Course.find();
    console.log('\n[FIND] All Courses in Database:');
    allCourses.forEach(c => console.log(`- ${c.course_id}: ${c.course_name} (${c.faculty})`));

    // 4. UPDATE: Update a course by ID
    const updateId = 'CS101';
    const updatedCourse = await Course.findOneAndUpdate(
      { course_id: updateId },
      { faculty: 'Dr. John Smith (Head of Dept)' },
      { new: true }
    );
    console.log(`\n[UPDATE] Updated ${updateId} faculty to: ${updatedCourse.faculty}`);

    // 5. DELETE: Delete a course by ID
    const deleteId = 'PHY101';
    await Course.findOneAndDelete({ course_id: deleteId });
    console.log(`\n[DELETE] Removed course ${deleteId} from system.`);

    // Final check
    const finalCount = await Course.countDocuments();
    console.log(`\nTotal courses remaining: ${finalCount}`);

  } catch (err) {
    console.error('Error during MongoDB operations:', err);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed.');
  }
}

runAssignment();
