import { Suspense, use } from 'react';

import { MachineWidgets } from '@/lib/machines/MachineWidgets';
import type { Machine } from '@/lib/machines/machineData';
import { loadMachinesData } from '@/lib/machines/machineData';
import { MachineState, MachineType } from '@/lib/machines/machineData';

export function PageWithData({ machineDataPromise }: { machineDataPromise: Promise<Machine[]> }) {
    const data = use(machineDataPromise);
    const sortedData = data.sort((a, b) => {
        if (a.type === b.type) {
            return a.id.localeCompare(b.id);
        }
        return a.type === MachineType.WASHER ? -1 : 1;
    });
    const washers = sortedData.filter(m => m.type === MachineType.WASHER);
    const dryers = sortedData.filter(m => m.type === MachineType.DRYER);
    const numAvailableWashers = washers.filter(
        m => m.status.type === MachineState.AVAILABLE
    ).length;
    const numAvailableDryers = dryers.filter(m => m.status.type === MachineState.AVAILABLE).length;
    return (
        <div>
            <div className="pb-8 pt-2">
                <h1 className="text-3xl pb-2">Rootes Laundromat</h1>
                <p>
                    <span className="text-xl">{numAvailableWashers}</span> washers available
                </p>
                <p>
                    <span className="text-xl">{numAvailableDryers}</span> dryers available
                </p>
            </div>
            <MachineWidgets washers={washers} dryers={dryers} />
        </div>
    );
}

function LoadingPage() {
    return <div>Loading...</div>;
}

export default function Page() {
    return (
        <main className="p-2">
            <Suspense fallback={<LoadingPage />}>
                <PageWithData machineDataPromise={loadMachinesData()} />
            </Suspense>
        </main>
    );
}
