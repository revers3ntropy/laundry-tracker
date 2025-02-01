import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

export function Footer() {
    return (
        <footer className="flex items-center gap-4 flex-col py-4 text-gray-400">
            <p>
                Created by{' '}
                <a href="https://josephcoppin.com" target="_blank" className="underline">
                    Joseph Coppin
                </a>{' '}
                and Jonathan Iles
            </p>
            <p>
                <a
                    href="https://github.com/revers3ntropy/laundry-tracker"
                    className="flex items-center justify-center gap-2"
                    target="_blank"
                >
                    <Icon path={mdiGithub} size={1.1} className="inline" /> Source Code
                </a>
            </p>
        </footer>
    );
}
