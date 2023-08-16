const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fatchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the Notes User Details using : GET "/api/auth/fetchallnotes".login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error");
  }
});
//ROUTE 2: Add a New Notes Notes User Details using : POST "/api/auth/addnote".login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors,return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever Error");
    }
  }
);
//ROUTE 3: Update an existing Notes User Details using : PUT "/api/auth/updatenote".login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Creat a new Note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be update and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      returnres.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error");
  }
});

//ROUTE 4: Delete an existing Notes User Details using : DELETE "/api/auth/deletenote".login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this notes

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Notes has bee Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
