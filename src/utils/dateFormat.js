export default function dateFormat(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  switch (true) {
    case diff < 60:
      return `${diff}s`;
    case diff < 3600:
      return `${Math.floor(diff / 60)}m`;
    case diff < 86400:
      return `${Math.floor(diff / 3600)}h`;
    case diff < 2592000:
      return `${Math.floor(diff / 86400)}d`;
    case diff < 31536000:
      return `${Math.floor(diff / 2592000)}mo`;
    default:
      return `${Math.floor(diff / 31536000)}y`;
  }
};
