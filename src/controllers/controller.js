const { nanoid } = require("nanoid");
const books = [];

class Controller {
	static async getAllBook(request, h) { 
		const { name, reading, finished } = request.query;

		let filteredBooks = books;

		if (name) {
			filteredBooks = filteredBooks.filter((book) => 
				book.name.toLowerCase().includes(name.toLowerCase())
			);
		}

		if (reading) {
			filteredBooks = filteredBooks.filter((book) => 
				book.reading === !!parseInt(reading)
			);
		}

		if (finished) {
			filteredBooks = filteredBooks.filter((book) => 
				book.finished === !!parseInt(finished)
			);
		}

		const response = h.response({
			status: "success",
			data: {
				books: filteredBooks.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		return response;
	}

	static async getBookById(request, h) {
		const { id } = request.params;

		const isSuccess = books.some((book) => book.id === id);

		const response = h.response({
			status: isSuccess ? "success" : "fail",
			data: isSuccess ? { book: books.find((book) => book.id === id) } : undefined,
			message: isSuccess ? undefined : "Book not found",
		});

		response.code(isSuccess ? 200 : 404);
		return response;
	}

	static async addBook(request, h) {
		const {
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
		} = request.payload;

		const id = nanoid();
		const finished = pageCount === readPage;
		const insertedAt = new Date().toISOString();
		const updatedAt = insertedAt;

		const addedBook = {
			id,
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			insertedAt,
			updatedAt,
		};

		books.push(addedBook);

		const isSuccess = books.some((book) => book.id === id);

		const response = h.response({
			status: isSuccess ? "success" : "fail",
			message: isSuccess ? "Book successfully added" : "Book failed to add",
			data: isSuccess ? { bookId: id } : undefined,
		});

		response.code(isSuccess ? 201 : 500);
		return response;
	}
}

module.exports = Controller;
