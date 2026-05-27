import { AdminTable } from "@/components/admin/AdminTable";
import { listAdminRows } from "@/lib/adminRepository";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  return <AdminTable title="Enquiries" resource="enquiries" columns={["type", "name", "company", "email", "phone", "message", "relatedProduct", "relatedSolution", "dateSubmitted", "status"]} rows={await listAdminRows("enquiries")} />;
}
