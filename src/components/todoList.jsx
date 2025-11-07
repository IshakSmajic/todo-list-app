import TodoItem from "./TodoItem"

export default function TodoList({ todos, toggleTodo, deleteTodo }){
    if(todos.length === 0) return <p>No tasks yet.</p>;

    return(
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
            ))}
        </ul>
    );
}