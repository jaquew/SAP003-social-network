function Button(props) {
  const template = `
    <button
    id="${props.id}"
    data-id="${props.dataId}"
    data-com="${props.idCom}"
    class="${props.class}"
    onclick="button.handleClick(event, ${props.onClick})"
    >
    ${props.title}
    </button>
  `;

  return template;
}

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
};

export default Button;