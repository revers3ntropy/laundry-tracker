import { MachineWidget } from '@/lib/machines/MachineWidget';
import type { Machine } from '@/lib/machines/machineData';

export function MachineWidgets({ washers, dryers }: { washers: Machine[]; dryers: Machine[] }) {
    return (
        <>
            <div className="flex flex-wrap gap-2">
                {washers.map(machine => (
                    <div key={machine.id}>
                        <MachineWidget machine={machine} />
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-8">
                {dryers.map(machine => (
                    <div key={machine.id}>
                        <MachineWidget machine={machine} />
                    </div>
                ))}
            </div>
        </>
    );
}
