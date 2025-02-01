import { Suspense, use } from 'react';

import { MachineWidgets } from '@/lib/machines/MachineWidgets';
import type { Machine } from '@/lib/machines/machineData';
import { loadMachinesData } from '@/lib/machines/machineData';
import { MachineType } from '@/lib/machines/machineData';
import { PageReloadButton } from '@/components/PageReloadButton';
import { MachinesInfo } from '@/lib/machines/MachinesInfo';
import { ROOM_CODES, validateRoom } from '@/lib/rooms';
import { RoomDropdown } from '@/lib/RoomDropdown';
import { Skeleton } from '@/components/ui/skeleton';

function PageWithData({ machineDataPromise }: { machineDataPromise: Promise<Machine[]> }) {
    const data = use(machineDataPromise);
    const sortedData = data.sort((a, b) => {
        if (a.type === b.type) {
            return a.id.localeCompare(b.id);
        }
        return a.type === MachineType.WASHER ? -1 : 1;
    });
    const washers = sortedData.filter(m => m.type === MachineType.WASHER);
    const dryers = sortedData.filter(m => m.type === MachineType.DRYER);
    return (
        <div>
            <div className="flex justify-between w-full">
                <div className="pb-8 pt-2">
                    <MachinesInfo washers={washers} dryers={dryers} />
                </div>
                <div className="flex justify-center items-center">
                    <PageReloadButton />
                </div>
            </div>
            <MachineWidgets washers={washers} dryers={dryers} />
        </div>
    );
}

function LoadingPage() {
    return (
        <div>
            <div className="flex items-center space-x-4 pb-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 pb-4">
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
            </div>

            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
                <Skeleton className="h-28 w-[200px]" />
            </div>
        </div>
    );
}

export default async function Page({
    searchParams
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const room = validateRoom((await searchParams)['r']);
    fetch(`https://api.alliancelslabs.com/washAlert/machines/${ROOM_CODES[room]}`, {
        headers: {
            'alliancels-organization-id': '652210'
        }
    })
        .then(r => r.json())
        .then(console.log);
    return (
        <>
            <h1 className="text-lg">University of Warwick Laundromat Tracker</h1>
            <div className="pt-4 pb-4">
                <RoomDropdown room={room} />
            </div>
            <Suspense fallback={<LoadingPage />}>
                <PageWithData machineDataPromise={loadMachinesData(room)} />
            </Suspense>
        </>
    );
}
