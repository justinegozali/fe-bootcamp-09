"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import getConfig from "@/firebase/config";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Modal } from "@/components/modal";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    const { auth } = getConfig();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrors({
          login: errorMessage || "Login failed. Please try again.",
        });
      });
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <button className={styles.submitButton} onClick={handleLogin}>
          Login
        </button>
        <div className={`${styles.formGroup} ${styles.registerPrompt}`}>
          <label>Don&apos;t have an account?</label>
          <Link href="/register" className={styles.registerLink}>
            Register
          </Link>
        </div>
      </div>
      {errors.login && (
        <Modal
          title="Login Error"
          message={errors.login}
          onClose={() => setErrors({})}
        />
      )}
    </div>
  );
}
