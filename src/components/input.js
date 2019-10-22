function Input(props) {
    const template = `
      <input
      class='${props.class}'
      data-id='${props.dataId}'
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
  