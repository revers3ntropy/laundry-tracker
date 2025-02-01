import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageWithData } from '@/app/page';
import type { Machine } from '@/app/machineData';
import { MachineState, MachineType } from '@/app/machineData';

test('Page', () => {
    const mockData = [
        { id: 'a', type: MachineType.WASHER, status: { type: MachineState.AVAILABLE } }
    ] satisfies Machine[];
    render(<PageWithData machineDataPromise={Promise.resolve(mockData)} />);
    expect(screen.findByText('Washer')).toBeDefined();
    expect(screen.findByText('Available')).toBeDefined();
});
