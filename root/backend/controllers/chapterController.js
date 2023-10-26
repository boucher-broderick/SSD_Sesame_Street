const Chapter = require('../models/chapterModel');

exports.addChapter = async (req, res) => {
  try {
    const { title, content, } = req.body;

    const newChapter = new Chapter({
      title,
      content,
    });

    const savedChapter = await newChapter.save();

    res.json(savedChapter);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    const deletedChapter = await Chapter.findByIdAndRemove(chapterId);

    if (!deletedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json({ message: 'Chapter deleted', chapter: deletedChapter });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.editChapter = async (req, res) => {
  try {
    const chapterId = req.params.chapterId;

    const { title, content,  } = req.body;

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { title, content, },
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json(updatedChapter);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};