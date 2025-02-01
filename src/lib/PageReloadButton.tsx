'use client';

import { RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PageReloadButton() {
    return (
        <Button variant="outline" onClick={() => location.reload()}>
            <RotateCw size={2} />
            Reload
        </Button>
    );
}
