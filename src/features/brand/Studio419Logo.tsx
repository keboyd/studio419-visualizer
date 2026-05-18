import { studio419Logo } from "./studio419LogoData";

export function Studio419Logo() {
  return (
    <svg
      className={studio419Logo.className}
      data-name="Layer 2"
      id="Layer_2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={studio419Logo.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <style>{`.${studio419Logo.fillClassName}{fill:currentColor;}`}</style>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <g>
            {studio419Logo.paths.slice(0, 6).map((path) => (
              <path className={studio419Logo.fillClassName} d={path} key={path} />
            ))}
          </g>
          <g>
            {studio419Logo.paths.slice(6).map((path) => (
              <path className={studio419Logo.fillClassName} d={path} key={path} />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
