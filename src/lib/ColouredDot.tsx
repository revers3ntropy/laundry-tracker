export function ColouredDot({ colour, className = '' }: { colour: string; className?: string }) {
    return (
        <span
            className={`inline-block w-3 h-3 rounded-full ${className}`}
            style={{ backgroundColor: colour }}
        ></span>
    );
}
