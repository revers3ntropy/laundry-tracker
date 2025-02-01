'use client';

import { fmtTimeDurationMinutes } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Timer({ seconds, onComplete }: { seconds: number; onComplete?: () => void }) {
    const [time, setTime] = useState(seconds);
    useEffect(() => {
        setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            } else if (onComplete) {
                onComplete();
            }
        }, 1000);
    }, [time, onComplete]);
    return <span>{fmtTimeDurationMinutes(time)}</span>;
}
