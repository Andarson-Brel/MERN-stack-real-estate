const Excerpt = ({ text, maxLength }) => {
  if (text?.length <= maxLength) {
    return <span className="excerpt-txt">{text}</span>;
  }

  const truncatedText = text?.substring(0, maxLength).trim();
  return <span className="excerpt-txt">{truncatedText}...</span>;
};

export default Excerpt;
