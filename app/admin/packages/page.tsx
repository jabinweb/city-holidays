'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Package as PackageType } from '@/data/packages';
import { Plus, Search, Edit, Trash2, Eye, Filter, Package, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const dynamic = 'force-dynamic';


export default function AdminPackages() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPackages(packages.filter(pkg => pkg.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete package:', error);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || pkg.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <AdminLayout title="Packages Management">
        <div className="animate-pulse space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Packages Management">
      {/* Header */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="package">Multi-Day Packages</option>
              <option value="day-trip">Day Trips</option>
              <option value="overnight">Overnight Tours</option>
            </select>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setEditingPackage(null);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-blue-600">{packages.length}</div>
          <div className="text-sm text-gray-600">Total Packages</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {packages.filter(p => p.type === 'day-trip').length}
          </div>
          <div className="text-sm text-gray-600">Day Trips</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {packages.filter(p => p.type === 'overnight').length}
          </div>
          <div className="text-sm text-gray-600">Overnight Tours</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-orange-600">
            {packages.filter(p => p.popular).length}
          </div>
          <div className="text-sm text-gray-600">Popular Packages</div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={pkg.imageUrl}
                alt={pkg.title}
                fill
                className="object-cover"
              />
              {pkg.popular && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                  Popular
                </span>
              )}
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                {pkg.type || 'package'}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{pkg.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{pkg.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{pkg.duration}</span>
                <span>{pkg.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/packages/${pkg.id}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPackage(pkg);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePackage(pkg.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new package.</p>
        </div>
      )}

      {/* Package Form Modal */}
      {showForm && (
        <PackageFormModal
          package={editingPackage}
          onClose={() => {
            setShowForm(false);
            setEditingPackage(null);
          }}
          onSave={fetchPackages}
        />
      )}
    </AdminLayout>
  );
}

interface PackageFormModalProps {
  package: PackageType | null;
  onClose: () => void;
  onSave: () => void;
}

function PackageFormModal({ package: pkg, onClose, onSave }: PackageFormModalProps) {
  const [formData, setFormData] = useState({
    id: pkg?.id || '',
    title: pkg?.title || '',
    description: pkg?.description || '',
    price: pkg?.price || 0,
    duration: pkg?.duration || '',
    imageUrl: pkg?.imageUrl || '',
    location: pkg?.location || '',
    type: pkg?.type || 'package',
    popular: pkg?.popular || false,
    transportation: pkg?.transportation || '',
    highlights: pkg?.highlights || [],
    pickupPoints: pkg?.pickupPoints || [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = pkg ? `/api/packages/${pkg.id}` : '/api/packages';
      const method = pkg ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error('Failed to save package:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {pkg ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Package ID</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                disabled={!!pkg}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as "package" | "day-trip" | "overnight"})}
              >
                <option value="package">Multi-Day Package</option>
                <option value="day-trip">Day Trip</option>
                <option value="overnight">Overnight Tour</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="text"
                required
                placeholder="e.g., 3 Days / 2 Nights"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Transportation</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.transportation}
                onChange={(e) => setFormData({...formData, transportation: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              required
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => setFormData({...formData, popular: e.target.checked})}
            />
            <label htmlFor="popular" className="text-sm font-medium">Mark as Popular</label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : pkg ? 'Update Package' : 'Create Package'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
