import { SchemaProps } from '../types';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { HiDownload } from 'react-icons/hi';
type Props = {
  schemas: SchemaProps[];
};

export default function Output({ schemas }: Props) {
  const outputs = schemas.map((s) => generate(s));

  function download() {
    const zip = new JSZip();
    outputs.forEach((output) => zip.file(`${output.name}.js`, output.blob));
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => saveAs(content, 'schemas.zip'));
  }

  function singleDownload() {
    const res = copyNonEmpty(schemas);
    const json = JSON.stringify(res, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'schemas.json');
  }
  return (
    <>
      <div className="relative">
        <div className="flex gap-4">
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-gray-200 p-2"
            onClick={download}
          >
            <HiDownload className="text-2xl" />
            Download as multiple files
          </div>
          <div
            className="flex cursor-pointer gap-2 rounded-lg bg-gray-200 p-2"
            onClick={singleDownload}
          >
            <HiDownload className="text-2xl" />
            Download single file (for CLI)
          </div>
        </div>
        <br />
        {outputs.map((o) => (
          <div
            key={o._id}
            className="relative mb-8 rounded-md bg-black p-8 text-white"
          >
            <pre>{o.string}</pre>
          </div>
        ))}
      </div>
    </>
  );
}

function generate(schema: SchemaProps) {
  const res = copyNonEmpty(schema);
  const string = JSON.stringify(res, null, 2);
  const blob = new Blob([`export default ` + string], {
    type: 'text/javascript',
  });
  return {
    _id: schema._id,
    name: schema.name,
    string,
    blob,
  };
}

function copyNonEmpty(o: any) {
  const ignores = [null, undefined, '', false, 0];
  const isNonEmpty = (d: any) =>
    !ignores.includes(d) && (typeof d !== 'object' || Object.keys(d).length);
  return JSON.parse(JSON.stringify(o), function (k, v) {
    if (isNonEmpty(v) && k !== '_id') return v;
  });
}
