const Content = require('../models/contentModel');

exports.editContent = async (req, res) => {
  try {
    const { contentId, projectId, chapterId, content, links, images, videos } = req.body;

    const updatedContent = await Content.findByIdAndUpdate(
      contentId,
      { projectId, chapterId, content, links, images, videos },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({status: 200, content: updatedContent});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getContent = async (req, res) => {
  try {
    const {projectId, chapterId} = req.query;
    const content = await Content.find({ projectId: projectId, chapterId: chapterId });

    if (content.length === 0) {
      res.status(200).json({ status:500, message: "No projects found for the given user." });
    }
    else{
      res.status(200).json({ status:200, content: content});
    }
  } catch (error) {
    res.status(200).json({ status:500, error: "Error retrieving projects", errorMessage: error });
  }
};