function Input(props) {
  const template = `
      <input
      class='${props.class}'
      placeholder='${props.placeholder}'
      type='${props.type}' 
      id='${props.id}'
      onblur="input.handleClick(event, ${props.onBlur})"/>
    `;
  return template;
}

window.input = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
};

export default Input;
  