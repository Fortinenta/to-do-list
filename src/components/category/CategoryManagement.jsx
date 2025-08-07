import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import { showConfirmDialog } from '../common/ConfirmDialog';
import { 
  fetchCategoriesRequest, 
  addCategoryRequest, 
  updateCategoryRequest, 
  deleteCategoryRequest 
} from '../../store/slices/categorySlice';
import { validateCategory } from '../../utils/validators';

function CategoryManagement() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#000000',
    icon: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      color: '#000000',
      icon: '',
      description: '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      color: category.color || '#000000',
      icon: category.icon || '',
      description: category.description || '',
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (categoryId, categoryName) => {
    const result = await showConfirmDialog({
      title: 'Delete Category',
      text: `Are you sure you want to delete category "${categoryName}"? This will also remove all associated tasks.`,
      icon: 'warning',
    });
    if (result.isConfirmed) {
      dispatch(deleteCategoryRequest(categoryId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCategory(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (editingCategory) {
      dispatch(updateCategoryRequest({ id: editingCategory.id, updatedFields: formData }));
    } else {
      dispatch(addCategoryRequest(formData));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <Button onClick={handleAddClick} className="mb-4">Add New Category</Button>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Color</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No categories found.</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center">
                      <span className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                      {category.color}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="secondary" onClick={() => handleEditClick(category)} className="mr-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(category.id, category.name)}>Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            required
          />
          <Input
            label="Color (Hex Code)"
            id="color"
            name="color"
            type="color"
            value={formData.color}
            onChange={handleChange}
            error={formErrors.color}
            required
          />
          <Input
            label="Icon Name (Optional)"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="e.g., briefcase, home"
          />
          <Input
            label="Description (Optional)"
            id="description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editingCategory ? 'Update Category' : 'Add Category'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CategoryManagement;