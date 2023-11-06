const Project = require('../models/projectModel');

exports.addProject = async (req, res) => {
  try {
    const { userId, name, author, description, } = req.body;

    const newProject = new Project({
      userId,
      name,
      author,
      description,
    });

    const savedProject = await newProject.save();

    res.status(200).json({ status:200, project: savedProject});
  } catch (err) {
    console.error(err);
    res.status(500).json({status:500, error: 'Server Error'});
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const {projectId} = req.query;
    console.log(projectId);
    const deletedProject = await Project.findByIdAndRemove(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted', project: deletedProject });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.editProject = async (req, res) => {
  try {

    const { projectId, userId, name, author, description } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { userId, name, author, description  },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProjects = async (req, res) => {
  try {
    const {userId} = req.query;
    const projects = await Project.find({ userId: userId });

    if (projects.length === 0) {
      res.status(200).json({ status:500, message: "No projects found for the given user." });
    }
    else{
      res.status(200).json({ status:200, projects: projects});
    }
  } catch (error) {
    res.status(200).json({ status:500, error: "Error retrieving projects", errorMessage: error });
  }
};