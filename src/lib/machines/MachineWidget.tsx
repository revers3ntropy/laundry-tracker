import { ColouredDot } from '@/lib/ColouredDot';
import type { Machine, MachineStatus } from '@/lib/machines/machineData';
import { fmtMachineType, MachineState, machineStateColour } from '@/lib/machines/machineData';
import { fmtTimeDurationMinutes } from '@/lib/util';

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

export function MachineWidget({ machine }: { machine: Machine }) {
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
