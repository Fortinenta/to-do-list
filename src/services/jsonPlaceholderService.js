import axios from 'axios';

const PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const placeholderService = {
  getSampleTodos: async () => {
    const response = await axios.get(`${PLACEHOLDER_BASE_URL}/todos?_limit=10`);
    return response.data.map(todo => ({
      id: `sample-${todo.id}`,
      title: todo.title,
      completed: todo.completed,
      categoryId: 'sample-category',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['sample']
    }));
  }
};
