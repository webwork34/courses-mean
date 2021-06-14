const Course = require('./../models/courseModel');

// ===========Show all courses==========
module.exports.showAllCourses = async (req, res) => {
  const userId = req.user.userId;

  try {
    let courses = await Course.find({});

    courses = courses.map((course) => {
      if (course.created_by.toString() === userId) {
        course.editable = true;
      }

      return course;
    });

    if (!courses) {
      return res.status(404).json({message: 'No courses yet'});
    }

    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({message: err.message ? err.message : err});
  }
};

// ===========Show course by id==========
module.exports.showCourseById = async (req, res) => {
  const _id = req.params.id;

  try {
    const course = await Course.findOne({_id});

    if (!course) {
      return res.status(404).json({message: `No course with id - #${_id}`});
    }

    return res.status(200).json(course);
  } catch (err) {
    return res.status(404).json({message: `No course with id - #${_id}`});
  }
};

// ===========Create new course==========
module.exports.createCourse = async (req, res) => {
  const {title, description, authors, duration} = req.body;

  const newCourse = new Course({
    title,
    description,
    authors,
    duration,
    created_by: req.user.userId,
    editable: false,
  });

  try {
    await newCourse.save();

    return res.status(201).json({message: 'Course was created successfully'});
  } catch (err) {
    return res.status(500).json({message: err.message ? err.message : err});
  }
};

// ===========Edit course by id==========
module.exports.editCourse = (req, res) => {
  const _id = req.params.id;
  const created_by = req.user.userId;
  const {title, description, authors, duration} = req.body;

  Course.findOneAndUpdate(
    {_id, created_by},
    {$set: {title, description, authors, duration}},
    {new: true}
  )
    .exec()
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          message: `You can't update course with id ${_id}`,
        });
      }

      return res
        .status(200)
        .json({message: 'Course details were changed successfully'});
    })
    .catch((err) => res.status(500).json({message: err.message}));
};

// ===========Delete course by id==========
module.exports.deleteCourse = (req, res) => {
  const _id = req.params.id;
  const created_by = req.user.userId;

  Course.findOneAndDelete({_id, created_by})
    .exec()
    .then((course) => {
      if (!course) {
        return res.status(404).json({
          message: `No available course with id ${_id} for deleting`,
        });
      }
      return res.status(200).json({message: 'Course was deleted successfully'});
    })
    .catch((err) => res.status(500).json({message: err.message}));
};
