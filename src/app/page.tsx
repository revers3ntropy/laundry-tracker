import { Suspense, use } from 'react';
import { fmtTimeDurationMinutes } from '@/app/util';

enum MachineType {
    WASHER = 'MachineType::WASHER',
    DRYER = 'MachineType::DRYER'
}

function fmtMachineType(t: MachineType) {
    switch (t) {
        case MachineType.WASHER:
            return 'Washer';
        case MachineType.DRYER:
            return 'Dryer';
    }
}

enum MachineState {
    AVAILABLE = 'MachineState::AVAILABLE',
    IN_USE = 'MachineState::IN_USE',
    OUT_OF_ORDER = 'MachineState::OUT_OF_ORDER'
}

type MachineStatus =
    | { type: MachineState.OUT_OF_ORDER }
    | { type: MachineState.AVAILABLE }
    | {
          type: MachineState.IN_USE;
          remainingSeconds: number;
      };

interface Machine {
    id: string;
    type: MachineType;
    status: MachineStatus;
}

interface RawMachineData {
    id: string;
    currentStatus: string;
    machineType: { isWasher: boolean; isDryer: boolean };
}

function parseApiData(data: RawMachineData[]): Machine[] {
    return data.map(machine => {
        const state = JSON.parse(machine.currentStatus) as {
            remainingSeconds: number;
            statusId: string;
        };
        return {
            id: machine.id,
            type: machine.machineType.isWasher ? MachineType.WASHER : MachineType.DRYER,
            status:
                state.statusId === 'AVAILABLE'
                    ? { type: MachineState.AVAILABLE }
                    : state.statusId === 'IN_USE'
                      ? {
                            type: MachineState.IN_USE,
                            remainingSeconds: state.remainingSeconds
                        }
                      : { type: MachineState.OUT_OF_ORDER }
        };
    });
}

function ColouredDot({ colour, className = '' }: { colour: string; className?: string }) {
    return (
        <span
            className={`inline-block w-3 h-3 rounded-full ${className}`}
            style={{ backgroundColor: colour }}
        ></span>
    );
}

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
                {' '}
                <ColouredDot colour="orange" /> In use
            </p>
            <p>{fmtTimeDurationMinutes(state.remainingSeconds)} remaining</p>
        </>
    );
}

function MachineInfo({ machine }: { machine: Machine }) {
    return (
        <div className="p-2 border-solid border rounded-xl border-gray-600 w-40 h-32">
            {fmtMachineType(machine.type)}
            <MachineStateInfo state={machine.status} />
        </div>
    );
}

function Comments({ dataPromise }: { dataPromise: Promise<Machine[]> }) {
    const data = use(dataPromise);
    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {data.map(machine => (
                    <MachineInfo key={machine.id} machine={machine} />
                ))}
            </div>
        </div>
    );
}

async function loadData(): Promise<Machine[]> {
    const res = await fetch('https://api.alliancelslabs.com/washAlert/machines/15288', {
        headers: {
            'alliancels-organization-id': '652210'
        }
    });
    return parseApiData(await res.json());
}

export default function Page() {
    return (
        <main className="p-2">
            <Suspense fallback={<div>Loading...</div>}>
                <Comments dataPromise={loadData()} />
            </Suspense>
        </main>
    );
}
