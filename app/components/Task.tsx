'use client';
import { ITask } from "@/Types/tasks";
import {FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from 'react';
import Modal from './Modal'
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";


interface TaskProps{
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {

  const router= useRouter();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = 
  async (e) => {
      e.preventDefault();
      await editTodo({
          id: task.id,
          text: taskToEdit
      })
      setTaskToEdit("");
      setOpenModalEdit(false);
      router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh();
  }


  return (
    <tr key={task.id}>

    <td className=" w-full">{task.text}</td>

    <td className="flex gap-5">
      <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className=" text-blue-500" size={25} />

      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
                <h3 className="font-bold text-lg">Edit task</h3>
                <div className="modal-action">
                <input type="text" 
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                placeholder="Type here" 
                className="input input-bordered w-full max-w-full" required/>
                <button className="btn" type="submit">Submit</button>
                </div>
            </form>
         </Modal>

      <FiTrash2 onClick={() => setOpenModalDeleted(true)} cursor="pointer" className=" text-red-600" size={25}/>
      <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
            <div className="modal-action">
              <button className="btn" onClick={()=> handleDeleteTask(task.id)}> Yes</button>
            </div>
         </Modal>
    </td>
  </tr> 
  );
};

export default Task;