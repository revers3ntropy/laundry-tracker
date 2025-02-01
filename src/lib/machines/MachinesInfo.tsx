import type { Machine, MachineType } from '@/lib/machines/machineData';
import { machineStateColour } from '@/lib/machines/machineData';
import { MachineState } from '@/lib/machines/machineData';
import { fmtTimeDurationMinutes } from '@/lib/utils';
import { mdiTumbleDryer, mdiWashingMachine } from '@mdi/js';
import Icon from '@mdi/react';
import { ColouredDot } from '@/components/ColouredDot';
import type { ReactNode } from 'react';
import { Timer } from '@/components/Timer';

function secondsUntilNextMachineIsAvailable(machines: Machine[]): number {
    const inUseMachines = machines
        .filter(
            (
                m
            ): m is {
                id: string;
                type: MachineType;
                status: {
                    type: MachineState.IN_USE;
                    remainingSeconds: number;
                };
            } => m.status.type === MachineState.IN_USE
        )
        .sort((a, b) => a.status.remainingSeconds - b.status.remainingSeconds);
    if (inUseMachines.length > 0) {
        return inUseMachines[0]?.status?.remainingSeconds;
    }
    return -1;
}

function MachineClassInfo({
    machines,
    machineClassName,
    icon
}: {
    machines: Machine[];
    machineClassName: string;
    icon: ReactNode;
}) {
    const available = machines.filter(m => m.status.type === MachineState.AVAILABLE);
    const nextAvailable = secondsUntilNextMachineIsAvailable(machines);
    return (
        <p className="flex items-center">
            {icon}{' '}
            {available.length === 0 ? (
                nextAvailable > 0 ? (
                    <span>
                        <ColouredDot colour={machineStateColour(MachineState.IN_USE)} />{' '}
                        <span className="text-xl">
                            <Timer seconds={nextAvailable} />
                        </span>{' '}
                        until next {machineClassName} is available
                    </span>
                ) : (
                    <span>
                        <ColouredDot colour={machineStateColour(MachineState.OUT_OF_ORDER)} /> No{' '}
                        {machineClassName}s available
                    </span>
                )
            ) : (
                <span>
                    <ColouredDot colour={machineStateColour(MachineState.AVAILABLE)} />{' '}
                    <span className="text-xl">{available.length}</span> {machineClassName}
                    {available.length === 1 ? '' : 's'} available
                </span>
            )}
        </p>
    );
}

export function MachinesInfo({ washers, dryers }: { washers: Machine[]; dryers: Machine[] }) {
    return (
        <>
            <MachineClassInfo
                machineClassName="washer"
                machines={washers}
                icon={<Icon className="inline pr-2" path={mdiWashingMachine} size={1.5} />}
            />
            <MachineClassInfo
                machineClassName="dryer"
                machines={dryers}
                icon={<Icon className="inline pr-2" path={mdiTumbleDryer} size={1.5} />}
            />
        </>
    );
}
