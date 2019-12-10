export class FilterTodosValueConverter {
    toView(todos, filterTodos) {
        if (!todos) return;
        if (!filterTodos) return todos;

        let filteredTodos = [];
        todos.forEach(todo => {
            if (todo.status !== 'No') filteredTodos.push(todo);
        })
        return filteredTodos;
    }
}