interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export function YellowBtn({ children, className, ...props }: Props) {
    return (
        <button
            className={`bg-yellow text-black font-bold py-2 px-4 rounded hover:bg-primary hover:text-white ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
