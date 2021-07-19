import React, { FC, useState, useEffect } from "react";

export enum TodoListContainerType {
  Task = "Task",
  TodoList = "TodoList"
}

interface TodoListContainerProps {
  name: string;
  type: TodoListContainerType;
}

const TodoListContainer: FC<TodoListContainerProps> = ({
  name,
  children,
  type
}) => {
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [noTodolistMessage, setNoTodolistMessage] = useState<JSX.Element | string>(`You have no ${type}s...`)



  const filteredChildren = React.Children.toArray(children).filter((element) => {
    if (!React.isValidElement(element)) return;
    if (!element.props.todoListName) {
      if (!element.props.taskName) return
      if ((element.props.taskName as string).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) return element
    }
    if (!element.props.taskName) {
      if (!element.props.todoListName) return
      if ((element.props.todoListName as string).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) return element
    }
    return
  })

  useEffect(() => {
    if (searchTerm === ''){
      setNoTodolistMessage(`You have no ${type}s...`)
      return
    }
    if (filteredChildren.length < 1){
      setNoTodolistMessage(`No ${type}s found called "${searchTerm}"`)
    }
  }, [searchTerm])


  return (
    <div
      className={`bg-gray-200 w-full h-full rounded-lg sm:p-10 sm:px-5 p-2 px-3 flex flex-col`}
    >
      <h1 className="text-3xl font-semibold text-left mx-auto">{name}</h1>

      <div className="pt-2 flex flex-col text-gray-600 outline-none">
        <div className="grid grid-cols-12">
          <input
            className="bg-white h-14 px-5 pr-16 rounded-tl-lg text-md focus:outline-none focus:border-transparent border-transparent w-full grid-col-1 col-span-11"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="grid-col-2 bg-white w-full rounded-tr-lg focus:outline-none"
          >
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="bg-gray-100 w-full p-4 rounded-b-lg">
          <div className="w-full bg-white overflow-y-scroll overflow-x-hidden h-72 mx-auto pl-4 px-2 pt-4">
            {filteredChildren.length < 1 ? <div> {noTodolistMessage} </div>: filteredChildren}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListContainer;
