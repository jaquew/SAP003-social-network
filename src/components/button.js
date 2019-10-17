function Button(props) {
  const template = `
    <button data-id="${props.dataId}" class="${props.class}" onclick="button.handleClick(event, ${props.onClick})" >${props.title}</button>
  `;// data-id=${props.dataId}
  return template;
}

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault()
    callback(event)
  },
};

export default Button;
