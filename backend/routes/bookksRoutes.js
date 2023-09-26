import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'sari fields bhej de na yaar: title, author publishyear'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);

        return response.status(201).send(book);

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//route for getting all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

//route for getting 1 book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
})

//route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'sari fields bhej de na yaar: title, author publishyear'
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "book not found" })
        }
        return response.status(200).json({ message: "book updated successfully" })
    }
    catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
});

//deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'book nhi mili id sahi daal' });
        }

        return response.status(200).json({ message: 'book delete krdi' });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

export { router };