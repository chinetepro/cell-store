export default e => {
  e.persist();
  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
}