export enum MachineType {
    WASHER = 'MachineType::WASHER',
    DRYER = 'MachineType::DRYER'
}

export function fmtMachineType(t: MachineType) {
    switch (t) {
        case MachineType.WASHER:
            return 'Washer';
        case MachineType.DRYER:
            return 'Dryer';
    }
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

export async function loadMachinesData(): Promise<Machine[]> {
    const res = await fetch('https://api.alliancelslabs.com/washAlert/machines/15288', {
        headers: {
            'alliancels-organization-id': '652210'
        }
    });
    return parseApiData(await res.json());
}
