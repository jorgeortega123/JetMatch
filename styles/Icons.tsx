export default function Icons({
  icon,
  className,
  text,
}: {
  icon: string;
  className?: string;
  text?: string;
  fromNav?: boolean;
}) {
  switch (icon) {
    case "check":
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="">
            <path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415l-7.071 7.07Z" />
            <path
              fill-rule="evenodd"
              d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12Zm11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18Z"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      );
    case "alert":
      return (
        <svg
        className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill=""
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2z"
          />
        </svg>
      );
    default:
      return <span>error icon</span>;
  }
}
