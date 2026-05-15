import { AdminTable } from "@/components/admin/AdminTable";
import { enquiries } from "@/data/content";

export default function AdminEnquiriesPage() {
  return <AdminTable title="Enquiries" columns={["type", "name", "company", "email", "phone", "message", "relatedProduct", "relatedSolution", "dateSubmitted", "status"]} rows={enquiries} />;
}
