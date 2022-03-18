export function init(data) {
  return {
    type: "set_state",
    data,
  };
}

export function updateAction(data) {
  return {
    type: "update_info",
    data,
  };
}
