import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import getConfig from "@/firebase/config";
import modalStyles from "./css/add-modal.module.css";

export default function AddUserModal({ setShowModal }) {
  const { db } = getConfig();
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "users"), {
      name: form.name,
      email: form.email,
      age: parseFloat(form.age),
    });
    setShowModal(false);
  };

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modal}>
        <button
          className={modalStyles.close}
          onClick={() => setShowModal(false)}
          title="Close"
        >
          &times;
        </button>
        <h2 className={modalStyles.title}>Add User</h2>
        <div className={modalStyles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              min="0"
              required
            />
          </label>
          <button className={modalStyles.submit} onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
