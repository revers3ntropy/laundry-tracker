'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import type { Room } from '@/lib/rooms';
import { roomNames } from '@/lib/rooms';

export function RoomDropdown({ room }: { room: Room }) {
    return (
        <Select
            defaultValue={room}
            onValueChange={newRoom => window.location.assign(`/?r=${newRoom}`)}
        >
            <SelectTrigger className="w-full text-2xl h-fit">
                <SelectValue placeholder="Select Room" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(roomNames).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                        {value}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
