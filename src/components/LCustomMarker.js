/* eslint-disable max-len */
const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="691.429"
  height="1007.429"
  viewBox="0 0 182.94 266.549"
>
  <path
    d="M182.94 91.47c0 50.518-55.748 139.357-91.47 175.079C55.75 230.827 0 141.988 0 91.47 0 40.953 40.953 0 91.47 0c50.518 0 91.47 40.953 91.47 91.47z"
  />
</svg>
`;
/* eslint-enable */

export default L.divIcon({
  className: "",
  html: `<span class="pin">${svg}</span>`,
});
