const style = /<style(.*?)>/;

/**
 * @param {string} input
 */
export default (input) => {
  const match = style.exec(input);

  if (!match) return {};

  const list = match[1].trim().split(' ');

  return list.reduce((acc, curr) => {
    if (curr) {
      if (curr.includes('=')) {
        const [name, value] = curr.split('=');
        acc[name] = JSON.parse(value);
      } else {
        acc[curr] = true;
      }
    }
    return acc;
  }, {});
};
