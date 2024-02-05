import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal) {
    const categories = await this.HttpClient.get('/categories', { signal });
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
