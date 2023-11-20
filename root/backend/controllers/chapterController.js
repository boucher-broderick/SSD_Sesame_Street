const Chapter = require('../models/chapterModel');
const Content = require('../models/contentModel');

exports.addChapter = async (req, res) => {
  try {
    const { projectId, chapterNumber, name, description } = req.body;

    const newChapter = new Chapter({
      projectId, 
      chapterNumber, 
      name, 
      description 
    });

    const savedChapter = await newChapter.save();

    const newContent = new Content({
      projectId: savedChapter.projectId,
      chapterId: savedChapter._id, 
      content: " "
    });

    await newContent.save();


    res.status(200).json({status: 200, chapter: savedChapter});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.query;

    // First, delete all content associated with the chapter
    const deletedContent = await Content.deleteMany({ chapterId: chapterId });

    // Then, delete the chapter itself
    const deletedChapter = await Chapter.findByIdAndRemove(chapterId);

    if (!deletedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter and its content deleted', chapter: deletedChapter });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.editChapter = async (req, res) => {
  try {

    const {  chapterId, projectId, chapterNumber, name, description } = req.body;

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { projectId, chapterNumber, name, description, },
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({status: 200, chapter: updatedChapter});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getChapters = async (req, res) => {
  try {
    const {projectId} = req.query;
    const chapters = await Chapter.find({ projectId: projectId });
    if (chapters.length === 0) {
      res.status(200).json({ status:500, message: "No projects found for the given user." });
    }
    else{
      res.status(200).json({ status:200, chapters: chapters});
    }
  } catch (error) {
    res.status(200).json({ status:500, error: "Error retrieving projects", errorMessage: error });
  }
};