import React, { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
}

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from backend
  // Fetch contacts from backend
const fetchContacts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "GET",
    });
    const data = await res.json();
    setContacts(data || []); // data is already the array
  } catch (err) {
    console.error("Error fetching contacts:", err);
  } finally {
    setLoading(false);
  }
};


  // Delete contact
  const deleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("Error deleting contact");
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading contacts...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Dashboard</h1>

      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Service</th>
                <th className="p-3 border">Budget</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{contact.name}</td>
                  <td className="p-3 border">{contact.email}</td>
                  <td className="p-3 border">{contact.service}</td>
                  <td className="p-3 border">{contact.budget}</td>
                  <td className="p-3 border">{contact.message}</td>
                  <td className="p-3 border">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
