import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const UserNotifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Simulated API call
      return [
        { id: 1, message: 'Service A has a new update available' },
        { id: 2, message: 'Service C has a new update available' },
      ];
    },
  });

  const notificationCount = notifications?.length || 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-semibold">Notifications</h3>
          {notifications && notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="text-sm">
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No new notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserNotifications;
