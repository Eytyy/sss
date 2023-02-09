export default function List({
  list,
  format,
}: {
  list: any[];
  format: 'string' | 'object';
}) {
  if (!list.length) return null;
  return (
    <ul className="py-1">
      {list.map((item, index) => {
        return (
          <li
            key={index}
            className="my-2 py-1 px-2 bg-slate-100 rounded-md shadow-md"
          >
            {format === 'string' ? (
              <div>{item}</div>
            ) : (
              <div className="text-bold">{JSON.stringify(item, null, 2)}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
