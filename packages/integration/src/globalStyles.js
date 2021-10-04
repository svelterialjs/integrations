import { compile, serialize, stringify, middleware } from 'stylis';

export default (content) =>
  serialize(
    compile(content),
    middleware([
      (e) => {
        if (e.type === 'rule' && !e.value.startsWith(':global')) {
          if (!e.parent || e.parent.type !== '@keyframes') {
            e.props = e.props.map((x) => `:global(${x})`);
            e.value = e.props.join(',');
          }
        }
      },
      stringify,
    ])
  );
