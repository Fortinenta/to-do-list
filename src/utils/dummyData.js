import { v4 as uuidv4 } from 'uuid';

export const dummyCategories = [
  {
    id: uuidv4(),
    name: 'Personal',
    color: '#EF4444',
    icon: 'person',
    description: 'Tasks related to personal life',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Work',
    color: '#3B82F6',
    icon: 'briefcase',
    description: 'Tasks related to work or career',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Shopping',
    color: '#22C55E',
    icon: 'shopping_cart',
    description: 'Items to buy or shopping lists',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Health',
    color: '#F97316',
    icon: 'healing',
    description: 'Health and fitness related tasks',
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Study',
    color: '#8B5CF6',
    icon: 'school',
    description: 'Academic or learning tasks',
    createdAt: new Date().toISOString(),
  },
];

export const dummyTodos = [
  {
    id: uuidv4(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits',
    completed: false,
    priority: 'high',
    categoryId: dummyCategories[2].id, // Shopping
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['home', 'urgent'],
  },
  {
    id: uuidv4(),
    title: 'Finish project report',
    description: 'Complete analysis and write conclusions',
    completed: false,
    priority: 'high',
    categoryId: dummyCategories[1].id, // Work
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['work', 'deadline'],
  },
  {
    id: uuidv4(),
    title: 'Go for a run',
    description: '30 minutes easy pace',
    completed: true,
    priority: 'medium',
    categoryId: dummyCategories[3].id, // Health
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['exercise'],
  },
  {
    id: uuidv4(),
    title: 'Schedule dentist appointment',
    description: 'Check-up and cleaning',
    completed: false,
    priority: 'low',
    categoryId: dummyCategories[0].id, // Personal
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['health'],
  },
  {
    id: uuidv4(),
    title: 'Read React documentation',
    description: 'Focus on hooks and context API',
    completed: false,
    priority: 'medium',
    categoryId: dummyCategories[4].id, // Study
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['learning', 'frontend'],
  },
  {
    id: uuidv4(),
    title: 'Plan weekend trip',
    description: 'Research destinations and book accommodation',
    completed: false,
    priority: 'low',
    categoryId: dummyCategories[0].id, // Personal
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['travel', 'leisure'],
  },
  {
    id: uuidv4(),
    title: 'Prepare presentation slides',
    description: 'For next week\'s team meeting',
    completed: true,
    priority: 'high',
    categoryId: dummyCategories[1].id, // Work
    dueDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['work', 'meeting'],
  },
];
