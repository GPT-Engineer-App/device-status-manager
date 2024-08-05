import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DeviceList = ({ devices, onSelectDevice }) => {
  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardTitle>Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {devices.map((device) => (
            <li
              key={device.id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => onSelectDevice(device)}
            >
              <span>{device.name}</span>
              <Badge variant={device.status === 'Connected' ? 'success' : 'destructive'}>
                {device.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DeviceList;
