import { Suspense, use } from 'react';

import { MachineWidgets } from '@/lib/machines/MachineWidgets';
import type { Machine } from '@/lib/machines/machineData';
import { loadMachinesData } from '@/lib/machines/machineData';
import { MachineType } from '@/lib/machines/machineData';
import { PageReloadButton } from '@/lib/PageRealodButton';
import { MachinesInfo } from '@/lib/machines/MachinesInfo';
import { validateRoom } from '@/lib/rooms';
import { RoomDropdown } from '@/lib/RoomDropdown';

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
    return <div>Loading...</div>;
}

export default async function Page({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const room = validateRoom((await searchParams)['r']);
    return (
        <>
            <h1 className="text-lg">University of Warwick Laundromat Tracker</h1>
            <RoomDropdown room={room} />
            <Suspense fallback={<LoadingPage />}>
                <PageWithData machineDataPromise={loadMachinesData(room)} />
            </Suspense>
        </>
    );
}
