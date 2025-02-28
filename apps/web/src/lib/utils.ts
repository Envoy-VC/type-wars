interface TruncateProps {
  text?: string;
  position?: 'start' | 'middle' | 'end';
  length?: number;
  separator?: string;
}

export const truncate = (props: TruncateProps) => {
  const {
    text = '',
    position = 'middle',
    length = 10,
    separator = '...',
  } = props;

  if (text.length <= length) return text;

  switch (position) {
    case 'start':
      return text.slice(0, length) + separator + text.slice(-length);
    case 'middle':
      return (
        text.slice(0, Math.ceil(length / 2)) +
        separator +
        text.slice(-Math.floor(length / 2))
      );
    case 'end':
      return text.slice(0, length - separator.length) + separator;
    default:
      return text;
  }
};
