import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
};

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-6xl px-6", className)}
      {...props}
    />
  );
}
