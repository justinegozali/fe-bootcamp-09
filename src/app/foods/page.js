"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import getConfig from "@/firebase/config";

import styles from "./page.module.css";

import Loading from "@/components/loading";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AddFoodModal from "@/components/add-food-modal";

export default function FoodsPage() {
  const { role } = useAuthGuard();
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      const { db } = getConfig();
      const foodCol = collection(db, "foods");
      const foodSnapshot = await getDocs(foodCol);
      const foodList = foodSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFoodList(foodList);
      setLoading(false);
    };

    fetchFoods();
  }, []);

  const handleAddFood = () => {
    setShowModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      {role === "admin" && (
        <button className={styles.addButton} onClick={handleAddFood}>
          Add Food
        </button>
      )}
      <h3 className={styles.title}>Foods List</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>ID</th>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Price</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food) => (
            <tr key={food.id} className={styles.row}>
              <td className={styles.cell}>{food.id}</td>
              <td className={styles.cell}>{food.name}</td>
              <td className={styles.cell}>Rp {food.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <AddFoodModal setShowModal={setShowModal} />}
    </div>
  );
}
