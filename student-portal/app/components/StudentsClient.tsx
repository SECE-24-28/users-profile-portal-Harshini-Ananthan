"use client";

import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

type Student = {
  id: number;
  name: string;
  email: string;
  age?: number | null;
};

const fetchGraphQL = async (query: string, variables?: any) => {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json.data;
};

export default function StudentsClient() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = async () => {
    const q = `query { students { id name email age } }`;
    const data = await fetchGraphQL(q);
    setStudents(data?.students ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = `mutation ($name: String!, $email: String!, $age: Int) { createStudent(name: $name, email: $email, age: $age) { id name email age } }`;
    await fetchGraphQL(q, { name, email, age: age === "" ? null : Number(age) });
    setName("");
    setEmail("");
    setAge("");
    load();
  };

  const startEdit = (s: Student) => {
    setEditingId(s.id);
    setName(s.name);
    setEmail(s.email);
    setAge(s.age ?? "");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    const q = `\n      mutation ($id: Int!, $name: String, $email: String, $age: Int) \n      { updateStudent(id: $id, name: $name, email: $email, age: $age) \n       { id name email age } }`;
    await fetchGraphQL(q, { id: editingId, name, email, age: age === "" ? null : Number(age) });
    setEditingId(null);
    setName("");
    setEmail("");
    setAge("");
    load();
  };

  const handleDelete = async (id: number) => {
    const q = `mutation ($id: Int!) { deleteStudent(id: $id) }`;
    await fetchGraphQL(q, { id });
    load();
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 12 }}>Student Portal</h1>

      <form onSubmit={editingId ? handleUpdate : handleCreate} style={{ marginBottom: 20 }}>
        Name : 
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: 8 }} />
        <br /> <br />
        Email : 
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginRight: 8 }} />
        <br /><br />
        Age :
        <input placeholder="Age" value={age as any} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} style={{ width: 80, marginRight: 8 }} />
        <br /><br />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setName(""); setEmail(""); setAge(""); }} style={{ marginLeft: 8 }}>Cancel</button>
        )}
      </form>

      <div style={{ display: "grid", gap: 12 }}>
        {students.map((s) => (
          <div key={s.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ color: "#555" }}>{s.email} {s.age ? `• ${s.age}` : null}</div>
            </div>
            <div>
              <button onClick={() => startEdit(s)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <br /><br />

      <LogoutButton/>
    </div>
  );
}
