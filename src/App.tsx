import { useState } from 'react';

// Components
import Form from './components/Form/Form';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter/ExpenseFilter';
// import categories from './categories';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Milk', amount: 10.0, category: 'Groceries' },
    { id: 2, description: 'Egg', amount: 5.0, category: 'Groceries' },
    { id: 3, description: 'Movie', amount: 15.0, category: 'Entertainment' },
    { id: 4, description: 'Electricity', amount: 100.0, category: 'Utilities' },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className='mb-5'>
        <Form
          onSubmit={(newExpense) =>
            setExpenses([
              ...expenses,
              { ...newExpense, id: expenses.length + 1 },
            ])
          }
        />
      </div>

      <div className='mb-3'>
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </>
  );
};

export default App;
