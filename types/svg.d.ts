declare module "*.svg" {
  import { ComponentType } from "react";

  interface Props {
    className: string;
  }

  const ReactComponent: ComponentType<Props>;

  export { ReactComponent };
}
