import type { Machine, MachineType } from '@/lib/machines/machineData';
import { MachineState } from '@/lib/machines/machineData';
import { fmtTimeDurationMinutes } from '@/lib/util';
import { mdiTumbleDryer, mdiWashingMachine } from '@mdi/js';
import Icon from '@mdi/react';

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

export function MachinesInfo({ washers, dryers }: { washers: Machine[]; dryers: Machine[] }) {
    const availableWashers = washers.filter(m => m.status.type === MachineState.AVAILABLE);
    const nextWasherAvailable = secondsUntilNextMachineIsAvailable(washers);
    const availableDryers = dryers.filter(m => m.status.type === MachineState.AVAILABLE);
    const nextDryerAvailable = secondsUntilNextMachineIsAvailable(dryers);

    return (
        <>
            <p className="flex items-center">
                <Icon className="inline pr-2" path={mdiWashingMachine} size={1.5} />
                {availableWashers.length === 0 ? (
                    nextWasherAvailable > 0 ? (
                        <span>
                            <span className="text-xl">
                                {fmtTimeDurationMinutes(nextWasherAvailable)}
                            </span>{' '}
                            until next washer is available
                        </span>
                    ) : (
                        <span>No washers available</span>
                    )
                ) : (
                    <span>
                        <span className="text-xl">{availableWashers.length}</span> washers available
                    </span>
                )}
            </p>
            <p className="flex items-center">
                <Icon className="inline pr-2" path={mdiTumbleDryer} size={1.5} />
                {availableDryers.length === 0 ? (
                    nextDryerAvailable > 0 ? (
                        <span>
                            <span className="text-xl">
                                {fmtTimeDurationMinutes(nextDryerAvailable)}
                            </span>{' '}
                            until next dryer is available
                        </span>
                    ) : (
                        <span>No dryers available</span>
                    )
                ) : (
                    <span>
                        <span className="text-xl">{availableDryers.length}</span> dryers available
                    </span>
                )}
            </p>
        </>
    );
}
