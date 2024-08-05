import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DeviceList from '../components/DeviceList';
import DeviceDetails from '../components/DeviceDetails';

const Index = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { data: devices, isLoading, isError } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      // Simulated API call
      return [
        { id: 1, name: 'Device 1', status: 'Connected' },
        { id: 2, name: 'Device 2', status: 'Disconnected' },
        { id: 3, name: 'Device 3', status: 'Connected' },
      ];
    },
  });

  if (isLoading) return <div className="text-center mt-8">Loading devices...</div>;
  if (isError) return <div className="text-center mt-8 text-red-500">Error loading devices</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hardware Device Manager</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <DeviceList devices={devices} onSelectDevice={setSelectedDevice} />
        {selectedDevice && <DeviceDetails device={selectedDevice} />}
      </div>
    </div>
  );
};

export default Index;
