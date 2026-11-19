import type { Config } from "@measured/puck";
import { Form, FormProps } from "./components/Form";

type Props = {
  Form: FormProps
};

export const config: Config<Props> = {
  components: {
    Form
  }
};

export default config;
