




import React, { useRef, useState } from 'react';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const inputRef = useRef(null);


    const addTask = () => {
        const taskText = inputRef.current.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        inputRef.current.value = '';
        inputRef.current.focus();
    };


    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };


    const toggleTaskCompletion = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };


    const editTask = (id, newText) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    };


    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h1>Задачник</h1>
            <div>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Введите задачу"
                    style={{ width: '70%', marginRight: '10px' }}
                />
                <button onClick={addTask}>Добавить задачу</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <strong>Фильтр задач: </strong>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('completed')}>Выполненные</button>
                <button onClick={() => setFilter('incomplete')}>Невыполненные</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Список задач (Всего: {tasks.length})</h3>
                <ul>
                    {filteredTasks.map((task) => (
                        <li key={task.id} style={{ marginBottom: '10px' }}>
              <span
                  style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      marginRight: '10px',
                  }}
                  onDoubleClick={() => {
                      const newText = prompt('Изменить задачу:', task.text);
                      if (newText !== null) editTask(task.id, newText.trim());
                  }}
              >
                {task.text}
              </span>
                            <button onClick={() => toggleTaskCompletion(task.id)}>
                                {task.completed ? 'Не выполнено' : 'Выполнено'}
                            </button>
                            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManager;
