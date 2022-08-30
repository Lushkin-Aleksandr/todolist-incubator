import React from 'react';


const TodoList = () => {

    return (
        <div>
            <div>
                <h3>Title</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li>
                        <input type={"checkbox"} checked={true}/>
                        <span>Task 1</span>
                        <button>x</button>
                    </li>
                    <li>
                        <input type={"checkbox"} checked={true}/>
                        <span>Task 2</span>
                        <button>x</button>
                    </li>
                    <li>
                        <input type={"checkbox"} checked={true}/>
                        <span>Task 3</span>
                        <button>x</button>
                    </li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;