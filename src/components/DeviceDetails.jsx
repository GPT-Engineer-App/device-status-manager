import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const DeviceDetails = ({ device }) => {
  const [upgrading, setUpgrading] = useState(null);
  const queryClient = useQueryClient();

  const { data: services, isLoading, isError } = useQuery({
    queryKey: ['deviceServices', device.id],
    queryFn: async () => {
      // Simulated API call
      return [
        { id: 1, name: 'Service A', version: '1.0.0', latestVersion: '1.1.0' },
        { id: 2, name: 'Service B', version: '2.0.0', latestVersion: '2.0.0' },
        { id: 3, name: 'Service C', version: '1.5.0', latestVersion: '2.0.0' },
      ];
    },
  });

  const upgradeMutation = useMutation({
    mutationFn: async (serviceId) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    },
    onMutate: (serviceId) => {
      setUpgrading(serviceId);
    },
    onSuccess: (data, serviceId) => {
      queryClient.invalidateQueries(['deviceServices', device.id]);
      setUpgrading(null);
    },
    onError: (error, serviceId) => {
      console.error('Upgrade failed:', error);
      setUpgrading(null);
    },
  });

  if (isLoading) return <div>Loading services...</div>;
  if (isError) return <div>Error loading services</div>;

  return (
    <Card className="w-full md:w-2/3">
      <CardHeader>
        <CardTitle>{device.name} Details</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Installed Services</h3>
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service.id} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{service.name}</span>
                <span className="ml-2 text-sm text-gray-500">v{service.version}</span>
              </div>
              <div className="flex items-center">
                {service.version !== service.latestVersion ? (
                  <>
                    <AlertCircle className="text-yellow-500 mr-2" size={16} />
                    <span className="text-sm text-gray-500 mr-2">Latest: v{service.latestVersion}</span>
                    <Button
                      size="sm"
                      onClick={() => upgradeMutation.mutate(service.id)}
                      disabled={upgrading === service.id}
                    >
                      {upgrading === service.id ? 'Upgrading...' : 'Upgrade'}
                    </Button>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="text-green-500 mr-2" size={16} />
                    <span className="text-sm text-gray-500">Up to date</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DeviceDetails;
