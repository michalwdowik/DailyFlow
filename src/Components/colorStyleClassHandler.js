export const colorStyleBgHandler = (e) => {
  switch (e) {
    case "info":
      return `bg-info`;
    case "error":
      return `bg-error`;
    case "success":
      return `bg-success`;
    case "primary":
      return `bg-primary`;
    case "warning":
      return `bg-warning`;
    default:
      return `bg-black`;
  }
};

export const colorStyleTextHandler = (e) => {
  switch (e) {
    case "info":
      return `text-info`;
    case "error":
      return `text-error`;
    case "success":
      return `text-success`;
    case "primary":
      return `text-primary`;
    case "warning":
      return `text-warning`;
    default:
      return `text-black`;
  }
};

export const colorStyleRadioHandler = (e) => {
  switch (e) {
    case "info":
      return `radio-info`;
    case "error":
      return `radio-error`;
    case "success":
      return `radio-success`;
    case "primary":
      return `radio-primary`;
    case "warning":
      return `radio-warning`;
    default:
      return `radio-black`;
  }
};

export const colorStyleCheckboxHandler = (e) => {
  switch (e) {
    case "info":
      return `radio-info`;
    case "error":
      return `radio-error`;
    case "success":
      return `radio-success`;
    case "primary":
      return `radio-primary`;
    case "warning":
      return `radio-warning`;
    default:
      return `radio-black`;
  }
};

export const colorStyleInputHandler = (e) => {
  switch (e) {
    case "info":
      return `input-info`;
    case "error":
      return `input-error`;
    case "success":
      return `input-success`;
    case "primary":
      return `input-primary`;
    case "warning":
      return `input-warning`;
    default:
      return `input`;
  }
};

export const colorStyleTogglerHandler = (e) => {
  switch (e) {
    case "info":
      return `peer-checked:bg-info`;
    case "error":
      return `peer-checked:bg-error`;
    case "success":
      return `peer-checked:bg-success`;
    case "primary":
      return `peer-checked:bg-primary`;
    case "warning":
      return `peer-checked:bg-warning`;
    default:
      return ``;
  }
};

export const colorStyleBlobHandler = (e) => {
  switch (e) {
    case "info":
      return `#38bdf8`;
    case "error":
      return `#f87171`;
    case "success":
      return `#10b981`;
    case "primary":
      return `#7e22ce`;
    case "warning":
      return `#eab308`;
    default:
      return `#38bdf8`;
  }
};
