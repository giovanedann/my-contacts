const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoriesRepository.findAll(orderBy);

    response.send(categories);
  }

  show(request, response) {
    response.send('Show one category');
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name field is required' });
    }

    const categoryCreated = await CategoriesRepository.create(name);

    return response.json(categoryCreated);
  }

  update(request, response) {
    response.send('Updates a category');
  }

  delete(request, response) {
    response.send('Deletes a category');
  }
}

// Singleton pattern
module.exports = new CategoryController();
