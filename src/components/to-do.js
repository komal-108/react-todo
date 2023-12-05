import { useState } from "react";
let nextId = 0;

export default function ToDoList() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  function handleDelete(id) {
    const deleteToDo = items.filter((item) => item.id !== id);
    setItems(deleteToDo);
  }

  function handleAdd() {
    if(name === ""){
      setItems([...items]);
    }else if (editId != null) {
      const editToDo = items.find((item) => item.id === editId);
      const updateToDo = items.map((item) =>
        item.id === editToDo.id
          ? (item = { id: item.id, name })
          : { id: item.id, name: item.name }
      );
      setItems(updateToDo);
      setEditId(null);
      setName("");

    } else {
      setItems([...items, { id: nextId++, name: name }]);
      setName("");
    }
  }
  function handleEdit(id) {
    const editToDo = items.find((item) => item.id === id);
    setName(editToDo.name);
    setEditId(id);
  }

  console.log(items);
  return (
    <div className="todo_box">
      <div className="todo_container">
        <h1> To Do List React</h1>
        <input placeholder="Add Task" className="input_text" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="add_button" onClick={handleAdd}> {editId != null ? "Edit" : "Add"}</button>
        <div className="todo_list">
        <ul>
          {items.map((item) => (
            <li key={item.id} className="list_item">
              <input className="output" value={item.name}></input>
              <button className="button" onClick={() => handleDelete(item.id)}>Delete</button>
              <button  className="button" onClick={() => handleEdit(item.id)}>Edit</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
