const expandCodeMarkdown = function expandCodeMarkdown( title ) {
  return title.replace( /`([^`]+)`/, '<code class="language-text">$1</code>' );
}

export default expandCodeMarkdown
