import { ColouredDot } from '@/components/ColouredDot';
import type { Machine, MachineStatus } from '@/lib/machines/machineData';
import { MachineState, machineStateColour, MachineType } from '@/lib/machines/machineData';
import Icon from '@mdi/react';
import { mdiTumbleDryer, mdiWashingMachine } from '@mdi/js';
import { Timer } from '@/components/Timer';

function MachineStateInfo({ status }: { status: MachineStatus }) {
    if (status.type === MachineState.AVAILABLE) {
        return (
            <p className="flex gap-2 justify-start items-center text-lg">
                <ColouredDot colour={machineStateColour(status.type)} /> Available
            </p>
        );
    }
    if (status.type === MachineState.COMPLETE) {
        return (
            <p className="flex gap-2 justify-start items-center text-lg">
                <ColouredDot colour={machineStateColour(status.type)} /> Complete
            </p>
        );
    }
    if (status.type === MachineState.OUT_OF_ORDER) {
        return (
            <p className="flex gap-2 justify-start items-center text-lg">
                <ColouredDot colour={machineStateColour(status.type)} />
                Out of order
            </p>
        );
    }
    return (
        <>
            <p className="flex gap-2 justify-start items-center text-lg">
                <ColouredDot colour={machineStateColour(status.type)} /> In use
            </p>
            <p className="text-muted-foreground">
                <Timer seconds={status.remainingSeconds} /> remaining
            </p>
        </>
    );
}

export function MachineWidget({ machine }: { machine: Machine }) {
    return (
        <div
            className="p-2 border-solid border-2 rounded-xl border-gray-600 w-[200px] h-28"
            style={{ borderColor: machineStateColour(machine.status.type) }}
        >
            {machine.type === MachineType.WASHER ? (
                <>
                    <Icon className="inline" path={mdiWashingMachine} size={1} /> Washer
                </>
            ) : (
                <>
                    <Icon className="inline" path={mdiTumbleDryer} size={1} /> Dryer
                </>
            )}
            <div className="pl-1.5">
                <MachineStateInfo status={machine.status} />
            </div>
        </div>
    );
}
