import { Suspense, use } from 'react';
import { fmtTimeDurationMinutes } from '@/app/util';
import type { Machine, MachineStatus } from '@/app/machineData';
import { fmtMachineType, loadMachinesData, MachineState, MachineType } from '@/app/machineData';
import { ColouredDot } from '@/app/ColouredDot';

function MachineStateInfo({ state }: { state: MachineStatus }) {
    if (state.type === MachineState.AVAILABLE) {
        return (
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour="green" /> Available
            </p>
        );
    }
    if (state.type === MachineState.OUT_OF_ORDER) {
        return (
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour="red" />
                Out of order
            </p>
        );
    }
    return (
        <>
            <p className="flex gap-2 justify-start items-center">
                <ColouredDot colour="orange" /> In use
            </p>
            <p>{fmtTimeDurationMinutes(state.remainingSeconds)} remaining</p>
        </>
    );
}

function MachineInfo({ machine }: { machine: Machine }) {
    return (
        <div className="p-2 border-solid border-2 rounded-xl border-gray-600 w-40 h-28">
            {fmtMachineType(machine.type)}
            <MachineStateInfo state={machine.status} />
        </div>
    );
}

function PageWithData({ dataPromise }: { dataPromise: Promise<Machine[]> }) {
    const data = use(dataPromise);
    const sortedData = data.sort((a, b) => {
        if (a.type === b.type) {
            return a.id.localeCompare(b.id);
        }
        return a.type === MachineType.WASHER ? -1 : 1;
    });
    const numAvailableWashers = sortedData.filter(
        m => m.type === MachineType.WASHER && m.status.type === MachineState.AVAILABLE
    ).length;
    const numAvailableDryers = sortedData.filter(
        m => m.type === MachineType.DRYER && m.status.type === MachineState.AVAILABLE
    ).length;
    return (
        <div>
            <div className="pb-8 pt-2">
                <h1 className="text-3xl">Rootes Laundromat</h1>
                <p>
                    <span className="text-xl">{numAvailableWashers}</span> washers available
                </p>
                <p>
                    <span className="text-xl">{numAvailableDryers}</span> dryers available
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                {sortedData.map(machine => (
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
                <PageWithData dataPromise={loadMachinesData()} />
            </Suspense>
        </main>
    );
}
