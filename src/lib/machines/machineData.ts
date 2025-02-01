import type { Room } from '@/lib/rooms';
import { ROOM_CODES } from '@/lib/rooms';

export enum MachineType {
    WASHER = 'MachineType::WASHER',
    DRYER = 'MachineType::DRYER'
}

export enum MachineState {
    AVAILABLE = 'MachineState::AVAILABLE',
    IN_USE = 'MachineState::IN_USE',
    OUT_OF_ORDER = 'MachineState::OUT_OF_ORDER'
}

export type MachineStatus =
    | { type: MachineState.OUT_OF_ORDER }
    | { type: MachineState.AVAILABLE }
    | {
          type: MachineState.IN_USE;
          remainingSeconds: number;
      };

export function machineStateColour(state: MachineState): string {
    switch (state) {
        case MachineState.AVAILABLE:
            return 'green';
        case MachineState.IN_USE:
            return 'orange';
        case MachineState.OUT_OF_ORDER:
            return 'red';
    }
}

export interface Machine {
    id: string;
    type: MachineType;
    status: MachineStatus;
}

export interface RawMachineData {
    id: string;
    currentStatus: string;
    machineType: { isWasher: boolean; isDryer: boolean };
}

export function parseApiData(data: RawMachineData[]): Machine[] {
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

export async function loadMachinesData(room: Room): Promise<Machine[]> {
    try {
        const res = await fetch(
            `https://api.alliancelslabs.com/washAlert/machines/${ROOM_CODES[room]}`,
            {
                headers: {
                    'alliancels-organization-id': '652210'
                }
            }
        );
        return parseApiData(await res.json());
    } catch (e) {
        console.error('Error fetching machine data', e);
        return [];
    }
}
