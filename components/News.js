export const News = ({ article }) => {
  return (
    <a href={article.url} target="_blank">
      <div className="flex items-center gap-3 px-4 py-3 border-b-2 hover:bg-gray-200 transition duration-500 ease-in-out">
        <img
          src={article.urlToImage}
          alt={article.source.name}
          width={80}
          className="rounded-xl"
        />

        <div className="space-y-1">
          <h1 className="text-sm font-bold">{article.title}</h1>
          <p className="text-xs font-medium text-gray-500">
            {article.source.name}
          </p>
        </div>
      </div>
    </a>
  );
};
