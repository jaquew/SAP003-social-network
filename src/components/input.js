function Input(props) {
  const template = `
      <input
      class='${props.class}'
      data-id='${props.dataId}'
      placeholder='${props.placeholder}'
      type='${props.type}' 
      id='${props.id}'
      value='${props.value}'
      ${props.ev} = "input.handleClick(event, ${props.evFunction})"/>
      `;
  return template;
}

window.input = {
  handleClick: (event, callback) => {
    event.preventDefault();
    if (callback !== undefined) {
      callback(event);
    }
  },
};

export default Input;
