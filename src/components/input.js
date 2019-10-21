function Input(props) {
    const template = `
      <input
      class='${props.class}'
      placeholder='${props.placeholder}'
      type='${props.type}'
      id='${props.id}' />
    `;
    return template;
  }

// window.input = {
  // component: Input
// }

export default Input;
  