"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Row = Record<string, string | number | undefined>;
const longFields = new Set([
  "applications",
  "benefits",
  "body",
  "challenge",
  "compliance",
  "description",
  "documentIds",
  "images",
  "layers",
  "message",
  "metaDescription",
  "overview",
  "productIds",
  "recommendedProductIds",
  "relatedProductIds",
  "result",
  "solution",
  "solutionIds",
  "specifications",
  "summary",
  "tags"
]);

export function AdminTable({ title, rows, columns, resource }: { title: string; rows: Row[]; columns: string[]; resource: string }) {
  const [items, setItems] = useState(rows);
  const [editing, setEditing] = useState<Row | null>(null);
  const [error, setError] = useState("");

  async function remove(index: number) {
    setError("");
    const row = items[index];
    const response = await fetch(`/api/admin/${resource}`, {
      method: "DELETE",
      body: JSON.stringify({ id: row.id }),
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      setError("Unable to delete this row. Check the database connection and related records.");
      return;
    }
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function save(formData: FormData) {
    setError("");
    const row = Object.fromEntries(columns.map((column) => [column, String(formData.get(column) ?? "")])) as Row;
    const payload = editing?.id ? { id: editing.id, ...row } : row;
    const response = await fetch(`/api/admin/${resource}`, {
      method: editing?.id ? "PUT" : "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });
    if (!response.ok) {
      setError("Unable to save this row. Check required fields and database connection.");
      return;
    }
    const result = (await response.json()) as { row?: Row };
    const saved = result.row ?? payload;
    if (editing) {
      setItems((current) => current.map((item) => (item.id === editing.id ? { ...editing, ...saved } : item)));
    } else {
      setItems((current) => [saved, ...current]);
    }
    setEditing(null);
  }

  return (
    <section className="rounded-sm border border-black/10 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-ink">{title}</h2>
        <button onClick={() => setEditing({})} className="inline-flex items-center gap-2 rounded-sm bg-forest-700 px-3 py-2 text-sm font-semibold text-white">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/10 text-xs uppercase tracking-[0.14em] text-ink/55">
            <tr>
              {columns.map((column) => <th key={column} className="px-3 py-3">{column}</th>)}
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {items.map((row, index) => (
              <tr key={String(row.id ?? index)}>
                {columns.map((column) => <td key={column} className="max-w-xs truncate px-3 py-3">{row[column]}</td>)}
                <td className="flex gap-2 px-3 py-3">
                  <button aria-label="Edit" onClick={() => setEditing(row)} className="rounded-sm border border-black/10 p-2"><Edit3 size={15} /></button>
                  <button aria-label="Delete" onClick={() => remove(index)} className="rounded-sm border border-black/10 p-2 text-clay"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="mt-4 rounded-sm bg-clay/10 px-3 py-2 text-sm font-semibold text-clay">{error}</p>}
      {editing && (
        <form action={save} className="mt-6 grid gap-3 rounded-sm bg-forest-50 p-4 md:grid-cols-2">
          {columns.map((column) => (
            <label key={column} className="grid gap-2 text-sm font-semibold">
              {column}
              {longFields.has(column) ? (
                <textarea name={column} defaultValue={String(editing[column] ?? "")} rows={4} className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
              ) : (
                <input name={column} defaultValue={String(editing[column] ?? "")} className="rounded-sm border border-black/15 px-3 py-2 font-normal" />
              )}
            </label>
          ))}
          <div className="flex items-end gap-2">
            <button className="rounded-sm bg-forest-700 px-4 py-2 text-sm font-semibold text-white">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-sm border border-black/15 px-4 py-2 text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}
