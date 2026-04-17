import { cn } from "@/lib/utils";

type ContainerSize = "narrow" | "default" | "wide";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
  size?: ContainerSize;
};

const SIZE_CLASS: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-6 md:px-8", SIZE_CLASS[size], className)}
      {...props}
    />
  );
}
