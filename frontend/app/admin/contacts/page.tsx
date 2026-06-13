"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminSectionCard } from "@/components/admin/AdminCards";
import { ConfirmDeleteModal } from "@/components/admin/AdminDialogs";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { contactAPI } from "@/lib/api";
import type { Contact } from "@/lib/types";
import { formatDatetime } from "@/lib/utils";

export default function ContactsManagementPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data.contacts);
    } finally {
      setLoading(false);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void loadContacts();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const deleteContact = async () => {
    if (!deleteTarget) return;
    await contactAPI.delete(deleteTarget._id);
    toast.success("Contact removed.");
    setDeleteTarget(null);
    await loadContacts();
  };

  return (
    <AdminShell
      title="Contacts management"
      description="Review shorter contact requests separately from qualified leads so the admin team can route them appropriately."
    >
      <AdminSectionCard
        title="Contact requests"
        subtitle="These records come from the quick contact form on the public website."
      >
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-28 bg-white/10" />
            <Skeleton className="h-28 bg-white/10" />
          </div>
        ) : !contacts.length ? (
          <EmptyState
            title="No contact requests yet"
            description="Once visitors use the quick contact form, they will show up here."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {contacts.map((contact) => (
              <div key={contact._id} className="admin-panel p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{contact.name}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                      {formatDatetime(contact.createdAt)}
                    </p>
                  </div>
                  <button type="button" onClick={() => setDeleteTarget(contact)} className="admin-delete-icon">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="h-4 w-4" />
                      {contact.email}
                    </div>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone className="h-4 w-4" />
                      {contact.phone}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">{contact.message}</p>
              </div>
            ))}
          </div>
        )}
      </AdminSectionCard>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete contact request?"
        description="This removes the request permanently from the admin panel."
        confirmLabel="Delete contact"
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteContact}
      />
    </AdminShell>
  );
}
