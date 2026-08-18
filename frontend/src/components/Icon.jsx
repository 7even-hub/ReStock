const paths = {
  dashboard: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  box: "M3 7.5 12 3l9 4.5-9 4.5-9-4.5ZM3 7.5V17l9 4 9-4V7.5M12 12v9",
  cart: "M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 1.9-1.4L20 9H7M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM18 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
  package: "m4 7 8-4 8 4v10l-8 4-8-4V7Zm8 14V11M4 7l8 4 8-4",
  chart: "M4 19V5M4 19h17M8 16v-5M13 16V7M18 16v-8",
  bell: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 22h4",
  settings:
    "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2 2-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20h-2.82v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2-2 .06-.06A1.7 1.7 0 0 0 7.5 14.8a1.7 1.7 0 0 0-1.55-1H5.86V11h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88L7.1 8.06l2-2 .06.06A1.7 1.7 0 0 0 11 6.46a1.7 1.7 0 0 0 1-1.55V4.82h2.82v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2 2-.06.06A1.7 1.7 0 0 0 19.36 10a1.7 1.7 0 0 0 1.55 1H21v2.82h-.09a1.7 1.7 0 0 0-1.51 1.18Z",
  logout: "M10 17l5-5-5-5M15 12H3M21 4v16",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  plus: "M12 5v14M5 12h14",
  close: "M6 6l12 12M18 6 6 18",
  refresh: "M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4",
  minus: "M5 12h14",
};
export default function Icon({ name, size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name] || paths.plus} />
    </svg>
  );
}
