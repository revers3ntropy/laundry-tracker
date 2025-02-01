'use client';

import type { Room } from '@/lib/rooms';
import { roomNames } from '@/lib/rooms';

export function RoomDropdown({ room }: { room: Room }) {
    return (
        <select
            defaultValue={room}
            onChange={event => window.location.assign(`/?r=${event.target.value}`)}
        >
            {Object.entries(roomNames).map(([key, value]) => (
                <option key={key} value={key}>
                    {value}
                </option>
            ))}
        </select>
    );
}
