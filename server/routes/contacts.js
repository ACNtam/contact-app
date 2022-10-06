import express, { request } from "express";
import cors from "cors";
import db from "../db/db-connection.js";

const router = express.Router();

router.get('/', async function (req, res, next) {

    try {
      const contacts = await db.any('SELECT * FROM contact', [true]);
      res.send(contacts);
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Error from server" });
    }
  });

  router.get('/:id', async function (req, res, next) {

    try {
      const contacts = await db.any('SELECT * FROM contact WHERE id =$1', [req.params.id]);
      res.send(contacts[0]);
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Error from server" });
    }
  });
  
  /* post request goes here */
  /* Add users listing. */
  router.post('/', async (req, res) => {
      const contacts = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes,
      };
      console.log(contacts);
      try {
        const createdContacts = await db.one(
          'INSERT INTO contact(name, email, phone, notes) VALUES($1, $2, $3, $4) RETURNING *',
          [contacts.name, contacts.email, contacts.phone, contacts.notes]
        );
        console.log(createdContacts);
        res.send(createdContacts);
      } catch (e) {
        return res.status(500).json({message: "error on server side" });
      }
    });

    router.put('/:id', async (req, res) => {
      const contacts = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes,
      };
      console.log(contacts);
      try {
        const editContacts = await db.one(
          'UPDATE contact SET name=$1, email=$2, phone=$3, notes=$4 WHERE id=$5 RETURNING *',
          [contacts.name, contacts.email, contacts.phone, contacts.notes, req.params.id]
        );
        console.log(editContacts);
        res.send(editContacts);
      } catch (e) {
        return res.status(500).json({message: "error on server side" });
      }
    });

  /* delete request goes here  */
  //Parameterized queries use placeholders instead of directly writing the
  //values into the statements. Parameterized queries increase security and performance.
  
  router.delete('/:id', async (req, res) => {
      // : acts as a placeholder
      const contactId = req.params.id;
      try {
        await db.none('DELETE FROM contact WHERE id=$1', [contactId]);
        res.send({ status: 'success' });
      } catch (e) {
        return res.status(500).json({message:"error on server side " });
      }
    });
  
  export default router;
  