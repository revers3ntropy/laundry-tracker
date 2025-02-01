import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Machine } from '@/lib/machines/machineData';
import { MachineState, MachineType } from '@/lib/machines/machineData';
import { MachineWidgets } from '@/lib/machines/MachineWidgets';

test('Page', () => {
    const washers = [
        { id: 'a', type: MachineType.WASHER, status: { type: MachineState.AVAILABLE } }
    ] satisfies Machine[];
    render(<MachineWidgets washers={washers} dryers={[]} />);
    expect(screen.findByText('Washer')).toBeDefined();
    expect(screen.findByText('Available')).toBeDefined();
});
