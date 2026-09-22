type GoldenRoseProps = {
  label: string;
  className?: string;
};

const GoldenRose = ({ label, className = "golden-rose" }: GoldenRoseProps) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    role="img"
    aria-label={label}
  >
    <path
      d="M24.4 24.2c.15 6.2.15 12.6.1 19.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M23.6 33.2c-8.1-1.6-12.6 3.8-11.5 9.2 6.4-2.2 9.9-5.2 11.5-7.8z"
      fill="currentColor"
    />
    <path
      d="M25.2 29.4c7.6-2.1 12.4 3.2 11.6 8.8-6.2-2.1-9.6-4.8-11.6-7.2z"
      fill="currentColor"
    />
    <path
      d="M24 6.2c3.4 3.1 4.6 7.4 3.6 11.2 3.6-1.2 7.4.4 9.4 3.6-1.6 3.2-4.8 5.2-8.4 5.2 1.8 3.4.8 7.2-1.8 9.6-2.7-2.3-3.8-6.1-2.1-9.6-3.6.1-6.9-1.9-8.6-5.1 2.1-3.3 6-5 9.6-3.8C19.6 13.7 20.7 9.4 24 6.2z"
      fill="currentColor"
    />
    <circle cx="24" cy="20.2" r="4.1" fill="var(--navy-deep, #12192b)" />
    <circle cx="24" cy="20.2" r="2.1" fill="currentColor" />
  </svg>
);

export default GoldenRose;
