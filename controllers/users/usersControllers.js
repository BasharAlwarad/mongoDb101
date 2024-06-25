import { ObjectId } from 'mongodb';
import clientPromise from '../../db/db.js';
import {validationResult} from 'express-validator'

export const getAllUsers = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db('bashar123');
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const createSingleUser = async (req, res) => {
    try {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
        const client = await clientPromise;
        const db = client.db('bashar123');
        const user = req.body;
        user.createdAt= new Date().toISOString()
        const result = await db.collection('users').insertOne(user);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getSingleUser = async (req, res) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const client = await clientPromise;
        const db = client.db('bashar123');
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.send(error)
        // res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateSingleUser = async (req, res) => {
    const { id } = req.params;
    const newUser = req.body;
    try {
        const client = await clientPromise;
        const db = client.db('bashar123');
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: newUser }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientPromise;
        const db = client.db('bashar123');
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
