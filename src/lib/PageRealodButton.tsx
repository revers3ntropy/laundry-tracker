'use client';

import Icon from '@mdi/react';
import { mdiReload } from '@mdi/js';

export function PageReloadButton() {
    return (
        <button onClick={() => location.reload()}>
            <Icon path={mdiReload} size={3} />
        </button>
    );
}
