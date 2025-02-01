import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

export function Footer() {
    return (
        <footer className="flex items-center gap-4 flex-col py-4 text-foregroundLight">
            <p>
                Created by{' '}
                <a
                    href="https://josephcoppin.com"
                    target="_blank"
                    className="underline hover:text-foreground"
                >
                    Joseph Coppin
                </a>{' '}
                and{' '}
                <a
                    href="https://orcid.org/0009-0006-1364-9214"
                    target="_blank"
                    className="underline hover:text-foreground"
                >
                    Jonathan Iles
                </a>{' '}
            </p>
            <p>
                <a
                    href="https://github.com/revers3ntropy/laundry-tracker"
                    className="flex items-center justify-center gap-2 hover:text-foreground"
                    target="_blank"
                >
                    <Icon path={mdiGithub} size={1.1} className="inline" /> Source Code
                </a>
            </p>
        </footer>
    );
}
