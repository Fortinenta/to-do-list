import PropTypes from 'prop-types';

export const TodoPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  categoryId: PropTypes.string,
  dueDate: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
});
