import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { email, password });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={() => handleLogin(email, password)}>Login</button>
        <button onClick={() => handleRegister(email, password)}>Register</button>
      </form>
      <form>
        <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} placeholder="Title" />
        <input type="text" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} placeholder="Description" />
        <button onClick={handleCreateTask}>Create Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => handleUpdateTask(task.id)}>Update</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;