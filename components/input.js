import { forwardRef } from "react";

export const Input = forwardRef(({ error, ...rest }, ref) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <input ref={ref} type="text" className="" {...rest} />
      {error && (
        <span
          style={{
            color: "red",
          }}
        >
          {error.message}
        </span>
      )}
    </div>
  );
});
