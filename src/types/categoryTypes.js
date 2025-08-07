import PropTypes from 'prop-types';

export const CategoryPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
});
