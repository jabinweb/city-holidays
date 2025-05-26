'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MessageSquare, 
  Filter,
  Search,
  Eye,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';


interface FormResponse {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  data?: string;
  status: string;
  priority: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

interface Summary {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byType: Record<string, number>;
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    NEW: { color: 'bg-blue-100 text-blue-800', icon: Clock },
    READ: { color: 'bg-yellow-100 text-yellow-800', icon: Eye },
    REPLIED: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    CLOSED: { color: 'bg-gray-100 text-gray-800', icon: XCircle }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const priorityConfig = {
    LOW: { color: 'bg-gray-100 text-gray-800' },
    NORMAL: { color: 'bg-blue-100 text-blue-800' },
    HIGH: { color: 'bg-orange-100 text-orange-800' },
    URGENT: { color: 'bg-red-100 text-red-800' }
  };

  const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.NORMAL;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {priority}
    </span>
  );
};

const FormDetailModal = ({ 
  formResponse, 
  onClose, 
  onUpdate 
}: { 
  formResponse: FormResponse; 
  onClose: () => void;
  onUpdate: (id: string, updates: any) => void;
}) => {
  const [status, setStatus] = useState(formResponse.status);
  const [priority, setPriority] = useState(formResponse.priority);

  const handleUpdate = async () => {
    await onUpdate(formResponse.id, { status, priority });
    onClose();
  };

  const additionalData = formResponse.data ? JSON.parse(formResponse.data) : null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Form Response Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <XCircle size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <p className="capitalize font-medium">{formResponse.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Submitted</label>
              <p>{new Date(formResponse.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span>{formResponse.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                <a href={`mailto:${formResponse.email}`} className="text-blue-600 hover:underline">
                  {formResponse.email}
                </a>
              </div>
              {formResponse.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <a href={`tel:${formResponse.phone}`} className="text-blue-600 hover:underline">
                    {formResponse.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          {formResponse.subject && (
            <div>
              <label className="text-sm font-medium text-gray-500">Subject</label>
              <p className="font-medium">{formResponse.subject}</p>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-500">Message</label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="whitespace-pre-wrap">{formResponse.message}</p>
            </div>
          </div>

          {/* Additional Data */}
          {additionalData && (
            <div>
              <label className="text-sm font-medium text-gray-500">Additional Information</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">
                  {JSON.stringify(additionalData, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Status Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="NEW">New</option>
                <option value="READ">Read</option>
                <option value="REPLIED">Replied</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AdminFormsPage() {
  const [formResponses, setFormResponses] = useState<FormResponse[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<FormResponse | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    priority: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFormResponses();
  }, [filters, page]);

  const fetchFormResponses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...filters
      });

      const response = await fetch(`/api/admin/forms?${params}`);
      if (response.ok) {
        const data = await response.json();
        setFormResponses(data.formResponses);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Failed to fetch form responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateForm = async (id: string, updates: any) => {
    try {
      const response = await fetch('/api/admin/forms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });

      if (response.ok) {
        fetchFormResponses();
      }
    } catch (error) {
      console.error('Failed to update form response:', error);
    }
  };

  const filteredForms = formResponses.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && formResponses.length === 0) {
    return (
      <AdminLayout title="Form Responses">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Form Responses">
      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Responses</h3>
            <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">New</h3>
            <p className="text-2xl font-bold text-blue-600">{summary.byStatus.NEW || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
            <p className="text-2xl font-bold text-orange-600">{summary.byPriority.HIGH || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Urgent</h3>
            <p className="text-2xl font-bold text-red-600">{summary.byPriority.URGENT || 0}</p>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search responses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="contact">Contact</option>
                <option value="inquiry">Quick Inquiry</option>
                <option value="booking">Booking</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="NEW">New</option>
                <option value="READ">Read</option>
                <option value="REPLIED">Replied</option>
                <option value="CLOSED">Closed</option>
              </select>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Priority</option>
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Responses Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject/Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{form.name}</div>
                      <div className="text-sm text-gray-500">{form.email}</div>
                      {form.phone && (
                        <div className="text-sm text-gray-500">{form.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {form.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      {form.subject && (
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {form.subject}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 truncate">
                        {form.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={form.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={form.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(form.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedForm(form)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No form responses found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Form responses will appear here once submitted.'}
            </p>
          </div>
        )}
      </div>

      {/* Form Detail Modal */}
      {selectedForm && (
        <FormDetailModal
          formResponse={selectedForm}
          onClose={() => setSelectedForm(null)}
          onUpdate={handleUpdateForm}
        />
      )}
    </AdminLayout>
  );
}
