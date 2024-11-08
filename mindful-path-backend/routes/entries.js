const express = require('express');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const router = express.Router();
const entriesDir = path.join(__dirname, '../data/entries');

// Export all entries as a ZIP file
router.get('/export', (req, res) => {
  const zipFileName = 'journal_entries.zip';
  res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level
  });

  archive.on('error', (err) => {
    res.status(500).json({ message: 'Error creating ZIP file' });
    throw err;
  });

  // Pipe archive data to the response
  archive.pipe(res);

  // Append each markdown file to the ZIP archive
  fs.readdir(entriesDir, (err, files) => {
    if (err) {
      res.status(500).json({ message: 'Could not retrieve entries' });
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(entriesDir, file);
      archive.file(filePath, { name: file });
    });

    // Finalize the ZIP file
    archive.finalize();
  });
});

// Create a new journal entry
router.post('/', (req, res) => {
  const { date, content } = req.body;
  const filePath = path.join(entriesDir, `${date}.md`);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving entry' });
    }
    res.status(201).json({ message: 'Entry saved successfully' });
  });
});

// Read a specific journal entry by date
router.get('/:date', (req, res) => {
  const { date } = req.params;
  const filePath = path.join(entriesDir, `${date}.md`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ content: data });
  });
});

// List all entries with their content
router.get('/', (req, res) => {
  fs.readdir(entriesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading entries' });
    }

    // Read each file's content
    const entries = files.map((file) => {
      const date = file.replace('.md', '');
      const content = fs.readFileSync(path.join(entriesDir, file), 'utf8');
      return { date, content };
    });

    res.status(200).json({ entries });
  });
});

module.exports = router;
