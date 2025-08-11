'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DeliveriesPage() {
  // This would eventually fetch real delivery data
  type Delivery = {
    id: string;
    alertName: string;
    createdAt: string | number | Date;
    status: 'queued' | 'sent' | 'delivered' | 'failed';
    to: string;
    message: string;
    error?: string;
  };

  const deliveries: Delivery[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Delivery History
        </h1>
        <p className="text-gray-600 mt-2">
          Track your alert deliveries and their status
        </p>
      </div>

      {/* Delivery List */}
      {deliveries.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>No deliveries yet</CardTitle>
            <CardDescription>
              Your alert delivery history will appear here once you
              start sending alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">
              Create an alert to see deliveries in action
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {delivery.alertName}
                    </CardTitle>
                    <CardDescription>
                      {new Date(delivery.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : delivery.status === 'sent'
                        ? 'bg-blue-100 text-blue-800'
                        : delivery.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {delivery.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  To: {delivery.to}
                </p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm">{delivery.message}</p>
                </div>
                {delivery.error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    Error: {delivery.error}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                0
              </div>
              <div className="text-sm text-gray-600">Total Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                0
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                100
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
