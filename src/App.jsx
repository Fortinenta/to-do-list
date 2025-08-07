import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import TodoList from './components/todo/TodoList';
import TodoForm from './components/todo/TodoForm';
import TodoStats from './components/todo/TodoStats';
import Button from './components/common/Button';
import Modal from './components/common/Modal';
import SearchBar from './components/filters/SearchBar';
import StatusFilter from './components/filters/StatusFilter';
import CategoryFilter from './components/filters/CategoryFilter';
import DateRangeFilter from './components/filters/DateRangeFilter';
import BulkActions from './components/filters/BulkActions';
import WeatherWidget from './components/widgets/WeatherWidget';
import QuoteWidget from './components/widgets/QuoteWidget';
import StatsWidget from './components/widgets/StatsWidget';
import ProductivityChart from './components/charts/ProductivityChart';
import CategoryChart from './components/charts/CategoryChart';
import PriorityChart from './components/charts/PriorityChart';
import TrendChart from './components/charts/TrendChart';

import PriorityFilter from './components/filters/PriorityFilter';
import CategoryManagement from './components/category/CategoryManagement';

import { useTodos } from './hooks/useTodos';
import { useCategories } from './hooks/useCategories';
import { useFilters } from './hooks/useFilters';
import { useBulkActions } from './hooks/useBulkActions';
import { useWeather } from './hooks/useWeather';
import { useQuote } from './hooks/useQuote';

import { fetchTodosRequest } from './store/slices/todoSlice';
import { fetchCategoriesRequest } from './store/slices/categorySlice';
import { clearSelectedItems } from './store/slices/bulkSlice';
import { fetchWeatherRequest } from './store/slices/weatherSlice';
import { fetchQuoteRequest } from './store/slices/quoteSlice';

function App() {
  const dispatch = useDispatch();
  const { todos } = useTodos();
  const { categories } = useCategories();
  const { filters, setStatus, toggleCategory, setSearch, setPriority, setDateRange, clearFilters } = useFilters();
  const { selectedItemIds, toggleSelect, toggleSelectAll, bulkMarkCompleted, bulkMarkUncompleted, bulkChangeCategory, bulkChangePriority, bulkDelete } = useBulkActions(todos.map(todo => todo.id));

  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [currentView, setCurrentView] = useState('tasks');

  useEffect(() => {
    dispatch(fetchTodosRequest());
    dispatch(fetchCategoriesRequest());
    dispatch(fetchWeatherRequest('Malang'));
    dispatch(fetchQuoteRequest());
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filters.searchText) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(filters.searchText.toLowerCase()))
      );
    }

    if (filters.status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filters.status === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter(todo => filters.category.includes(todo.categoryId));
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(todo => todo.priority === filters.priority);
    }

    return filtered;
  }, [todos, filters]);

  const completedTodosCount = filteredTodos.filter(todo => todo.completed).length;
  const pendingTodosCount = filteredTodos.filter(todo => !todo.completed).length;

  const handleAddTodoClick = () => {
    setEditingTodo(null);
    setIsTodoModalOpen(true);
  };

  const handleEditTodoClick = (todo) => {
    setEditingTodo(todo);
    setIsTodoModalOpen(true);
  };

  const handleCloseTodoModal = () => {
    setIsTodoModalOpen(false);
    setEditingTodo(null);
    dispatch(clearSelectedItems());
  };

  // Dummy data for charts (replace with real data from todos later)
  const productivityData = [
    { date: 'Mon', completed: 4, pending: 2 },
    { date: 'Tue', completed: 3, pending: 1 },
    { date: 'Wed', completed: 5, pending: 3 },
    { date: 'Thu', completed: 2, pending: 2 },
    { date: 'Fri', completed: 4, pending: 1 },
  ];

  const categoryChartData = categories.map(cat => ({
    name: cat.name,
    value: todos.filter(todo => todo.categoryId === cat.id).length,
  }));

  const priorityChartData = [
    { name: 'High', value: todos.filter(todo => todo.priority === 'high').length },
    { name: 'Medium', value: todos.filter(todo => todo.priority === 'medium').length },
    { name: 'Low', value: todos.filter(todo => todo.priority === 'low').length },
  ];

  const trendChartData = [
    { date: 'Week 1', completed: 10 },
    { date: 'Week 2', completed: 12 },
    { date: 'Week 3', completed: 15 },
    { date: 'Week 4', completed: 13 },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'tasks':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <WeatherWidget city="Malang" />
              <QuoteWidget />
              <TodoStats total={filteredTodos.length} completed={completedTodosCount} pending={pendingTodosCount} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Filters & Search</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                <SearchBar searchTerm={filters.searchText} onSearchChange={setSearch} />
                <StatusFilter currentStatus={filters.status} onStatusChange={setStatus} />
                <PriorityFilter currentPriority={filters.priority} onPriorityChange={setPriority} />
                <CategoryFilter categories={categories} selectedCategories={filters.category} onCategoryToggle={toggleCategory} />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
              </div>
            </div>

            <BulkActions
              selectedCount={selectedItemIds.length}
              onBulkMarkCompleted={bulkMarkCompleted}
              onBulkMarkUncompleted={bulkMarkUncompleted}
              onBulkChangeCategory={bulkChangeCategory}
              onBulkChangePriority={bulkChangePriority}
              onBulkDelete={bulkDelete}
              categories={categories}
            />

            <div className="flex justify-end mb-4">
              <Button onClick={handleAddTodoClick}>Add New Task</Button>
            </div>

            <TodoList
              todos={filteredTodos}
              onEditTodo={handleEditTodoClick}
              onSelectTodo={toggleSelect}
              selectedTodoIds={selectedItemIds}
              categories={categories}
            />
          </>
        );
      case 'categories':
        return <CategoryManagement />;
      case 'charts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductivityChart data={productivityData} />
            <CategoryChart data={categoryChartData} />
            <PriorityChart data={priorityChartData} />
            <TrendChart data={trendChartData} />
          </div>
        );
      case 'widgets':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <WeatherWidget city="Malang" />
            <QuoteWidget />
            <StatsWidget title="Total Tasks" value={todos.length} description="All tasks in your list" icon="📊" />
            <StatsWidget title="Completed Tasks" value={completedTodosCount} description="Tasks you've finished" icon="✅" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar onNavigate={setCurrentView} />
        <main className="flex-1 p-4 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <Footer />

      <Modal
        isOpen={isTodoModalOpen}
        title={editingTodo ? 'Edit Task' : 'Add New Task'}
        onClose={handleCloseTodoModal}
      >
        <TodoForm
          initialData={editingTodo}
          onClose={handleCloseTodoModal}
        />
      </Modal>
    </div>
  );
}

export default App;