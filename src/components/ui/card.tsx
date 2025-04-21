import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-white p-4 shadow-sm ${className}`} {...props}>
    {children}
  </div>
));

Card.displayName = "Card";

export { Card };

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-b pb-3 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);
