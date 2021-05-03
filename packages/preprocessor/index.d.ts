interface Config {
  variables?: Record<string, object>;
  settings?: {
    rtl?: boolean;
    spacer?: string;
    breakpoints?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
    transitions?: {
      primary?: string;
      secondary?: string;
    };
    shadows: Record<string, string>;
  };
  themes?: Record<string, object>;
}

declare function svelterial(
  config?: Config
): {
  style(input: {
    content: string;
    attributes: Record<string, string>;
    filename: string;
  }): {
    code: string;
    dependencies: string[];
  };
};

export default svelterial;
