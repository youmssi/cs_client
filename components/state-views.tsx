import { AlertTriangle, Loader2, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface StateViewProps {
  message?: string;
}

export function LoadingView({ message }: Readonly<StateViewProps>) {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4 min-h-[400px]">
      <Loader2 className="size-8 animate-spin text-primary" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function ErrorView({ message }: Readonly<StateViewProps>) {
  return (
    <div className="flex items-center justify-center h-full flex-1 flex-col gap-y-4 min-h-[400px]">
      <AlertTriangle className="size-8 text-destructive" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

interface EmptyViewProps extends StateViewProps {
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyView({
  title = "No items",
  message,
  actionLabel,
  onAction,
}: Readonly<EmptyViewProps>) {
  return (
    <div className="flex items-center justify-center h-full flex-1 min-h-[400px]">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PackageOpen className="size-6" />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          {message && <EmptyDescription>{message}</EmptyDescription>}
        </EmptyHeader>
        {actionLabel && onAction && (
          <EmptyContent>
            <Button onClick={onAction}>{actionLabel}</Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  );
}

interface ContainerViewProps {
  children: React.ReactNode;
  className?: string;
}

export const ContainerView = ({ children, className }: ContainerViewProps) => {
  return (
    <div
      className={cn(
        "mx-auto container h-full",
        className
      )}
    >
      {children}
    </div>
  );
};
