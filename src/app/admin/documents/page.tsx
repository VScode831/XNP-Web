import { AdminTable } from "@/components/admin/AdminTable";
import { technicalDocuments } from "@/data/content";

export default function AdminDocumentsPage() {
  return <AdminTable title="Documents" columns={["title", "type", "category", "application", "fileUrl", "version", "publishDate"]} rows={technicalDocuments.map((document) => ({ id: document.id, title: document.title, type: document.type, category: document.category, application: document.application, fileUrl: document.fileUrl, version: document.version, publishDate: document.publishDate }))} />;
}
