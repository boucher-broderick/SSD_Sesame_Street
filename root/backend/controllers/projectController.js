const Project = require('../models/projectModel');

exports.addProject = async (req, res) => {
  try {
    const { title, description} = req.body;
    
    const newProject = new Project({
      title,
      description,
    });

    const savedProject = await newProject.save();
    
    res.json(savedProject);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

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
    const projectId = req.params.projectId;

    const { title, description, } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description, },
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