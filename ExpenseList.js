/*import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDx0SVoBQfPlrxT68IwmNR3OKKdQdp-1Yw",
  authDomain: "expense-tracker-9da4c.firebaseapp.com",
  databaseURL: "https://expense-tracker-9da4c-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-9da4c",
  storageBucket: "expense-tracker-9da4c.appspot.com",
  messagingSenderId: "640370122741",
  appId: "1:640370122741:web:8fd9a5346ee2a7bbf10abc"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore(); // Access the Firestore database
    const expensesRef = db.collection('expenses');

    expensesRef
      .get()
      .then((querySnapshot) => {
        const loadedExpenses = [];
        querySnapshot.forEach((doc) => {
          const expense = {
            id: doc.id,
            expense: doc.data().expense,
            description: doc.data().description,
            category: doc.data().category,
          };
          loadedExpenses.push(expense);
        });
        setExpenses(loadedExpenses);
      })
      .catch((error) => {
        console.error('Error loading expenses:', error);
      });
  }, []);

  return (
    <div>
      <h2>Expenses List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <p>Expense: {expense.expense}</p>
            <p>Description: {expense.description}</p>
            <p>Category: {expense.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesList; */

import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const deleteExpense = (expenseId) => {
      const database = firebase.database();
      const expensesRef = database.ref(`expenses/${expenseId}`);
  
      expensesRef
        .remove()
        .then(() => {
          console.log('Expense deleted successfully');
          // Update the expenses state by removing the deleted expense
          setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== expenseId)
          );
        })
        .catch((error) => {
          console.error('Error deleting expense:', error);
        });
    };
  
    function handleDeleteExpense(expenseId) {
      if (loading) {
        return;
      }
  
      deleteExpense(expenseId);
  
      return (
        <button
          onClick={() => deleteExpense(expenseId)}
          disabled={loading}
          title="Deleting..."
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      );
    }
  
    return (
      <div>
        <h2>Expenses List</h2>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.expense}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{handleDeleteExpense(expense.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ExpensesList;
  