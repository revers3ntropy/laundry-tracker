import { Suspense, use } from 'react';
import { fmtTimeDurationMinutes } from '@/app/util';
import type { Machine, MachineStatus } from '@/app/machineData';
import { machineStateColour } from '@/app/machineData';
import { fmtMachineType, loadMachinesData, MachineState, MachineType } from '@/app/machineData';
import { ColouredDot } from '@/app/ColouredDot';

function MachineStateInfo({ status }: { status: MachineStatus }) {
    if (status.type === MachineState.AVAILABLE) {
        return (
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour={machineStateColour(status.type)} /> Available
            </p>
        );
    }
    if (status.type === MachineState.OUT_OF_ORDER) {
        return (
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour={machineStateColour(status.type)} />
                Out of order
            </p>
        );
    }
    return (
        <>
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour={machineStateColour(status.type)} /> In use
            </p>
            <p>{fmtTimeDurationMinutes(status.remainingSeconds)} remaining</p>
        </>
    );
}

function MachineInfo({ machine }: { machine: Machine }) {
    return (
        <div
            className="p-2 border-solid border-2 rounded-xl border-gray-600 w-40 h-28"
            style={{ borderColor: machineStateColour(machine.status.type) }}
        >
            {fmtMachineType(machine.type)}
            <MachineStateInfo status={machine.status} />
        </div>
    );
}

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
            <div className="flex flex-wrap gap-2">
                {washers.map(machine => (
                    <MachineInfo key={machine.id} machine={machine} />
                ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-8">
                {dryers.map(machine => (
                    <MachineInfo key={machine.id} machine={machine} />
                ))}
            </div>
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
